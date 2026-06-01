# Full image build (local): docker build --build-arg VITE_API_BASE_URL=... -t karsoogh-frontend .
# CI publish uses prebuilt dist: docker build --target ci -t karsoogh-frontend .

FROM node:20-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./

ENV HUSKY=0
RUN npm ci

COPY index.html vite.config.ts tsconfig.json tsconfig.app.json tsconfig.node.json ./
COPY postcss.config.js tailwind.config.js ./
COPY public ./public
COPY src ./src

# Vite bakes VITE_* vars into the bundle at build time (client-visible; never pass secrets)
ARG VITE_API_BASE_URL
ARG APP_ENV=production
ENV VITE_API_BASE_URL=$VITE_API_BASE_URL
ENV APP_ENV=$APP_ENV
RUN test -n "$VITE_API_BASE_URL" && echo "$VITE_API_BASE_URL" | grep -qE '^https?://'

RUN npm run build

# Shared nginx runtime — container listens on 3000; host nginx terminates :80 and proxy_passes here
FROM nginx:1.27-alpine AS base

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD wget --spider -q http://127.0.0.1:3000/ || exit 1

# CI: package dist/ produced by the workflow (npm run build + artifact download)
FROM base AS ci

COPY dist /usr/share/nginx/html

# Local / default: compile inside Docker
FROM base AS runner

COPY --from=builder /app/dist /usr/share/nginx/html
