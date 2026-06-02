# syntax=docker/dockerfile:1
# Karsoogh production frontend — static build + nginx on :3000
# Requires .env.prod in the build context (see README / docker-publish-production workflow).

FROM node:20-alpine AS frontend-builder

WORKDIR /app

ENV CI=1 \
    HUSKY=0

COPY package.json package-lock.json ./
RUN npm ci --no-audit --no-fund

COPY .env.prod .env
COPY \
    index.html \
    vite.config.ts \
    tsconfig.json \
    tsconfig.app.json \
    tsconfig.node.json \
    postcss.config.js \
    tailwind.config.js \
    ./
COPY public ./public
COPY src ./src

RUN npm run build


FROM nginx:1.27-alpine AS web

LABEL org.opencontainers.image.source="https://github.com/Karsoogh-Mehregan/Karsoogh-Frontend" \
      org.opencontainers.image.description="Karsoogh Frontend" \
      org.opencontainers.image.licenses="GPL-3.0-only"

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=frontend-builder /app/dist /usr/share/nginx/html

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=5s --start-period=15s --retries=3 \
    CMD wget --spider -q http://127.0.0.1:3000/ || exit 1

CMD ["nginx", "-g", "daemon off;"]
