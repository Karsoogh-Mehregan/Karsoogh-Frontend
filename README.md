# Karsoogh Frontend

This is the frontend application for Karsoogh, built with React and TypeScript.

## Tech Stack

- **Core:** React 19 & TypeScript
- **Build Tool:** Vite 7
- **Styling:** Tailwind CSS 3 & PostCSS
- **Routing:** React Router DOM 7
- **Markdown & Math:** React Markdown, KaTeX, Rehype
- **Testing:** Vitest & React Testing Library
- **Code Quality:** ESLint, Prettier, Husky & Commitlint

### Local Development Setup

Follow these steps to get the project running on your local machine.

1.  **Install Dependencies**

    ```bash
    npm install
    ```

2.  **Environment Configuration**

    ```bash
    cp .env.example .env
    ```

    Production Docker needs a gitignored `.env.prod` before `docker build` (see below). The develop image takes env at **runtime** (`docker run -e …`).

3.  **Start the Development Server**

    ```bash
    npm run dev
    ```

    - The server will start at `http://localhost:3000` (or `0.0.0.0:3000`).

4.  **Build for Production**
    To type-check and build the project:

    ```bash
    npm run build
    ```

5.  **Run Tests**
    To run the test suite using Vitest:

    ```bash
    npm test
    ```

6.  **Linting & Formatting**
    - **Lint:** `npm run lint`
    - **Format:** `npm run format`

### Docker

| File             | Purpose                                                                   |
| ---------------- | ------------------------------------------------------------------------- |
| `Dockerfile`     | Production: `npm run build` + **nginx** (`.env.prod` baked at build time) |
| `Dockerfile.dev` | Develop: **Vite dev server** — env passed at **runtime**                  |

**Production build & run:**

```bash
printf 'APP_ENV=production\nVITE_API_BASE_URL=https://api.example.com\n' > .env.prod
docker build -t karsoogh-frontend:prod .
docker run -d --name karsoogh-frontend -p 3000:3000 karsoogh-frontend:prod
```

**Develop build & run** (no env file in the image):

```bash
docker build -f Dockerfile.dev -t karsoogh-frontend:dev .
docker run -p 3000:3000 \
  -e APP_ENV=development \
  -e VITE_API_BASE_URL=https://api-dev.example.com \
  karsoogh-frontend:dev
```

Host nginx (or another reverse proxy) can terminate TLS on **port 80** and forward to the container on port 3000.

**Host nginx** (example — proxy to the container on port 3000):

```nginx
location / {
    proxy_pass http://127.0.0.1:3000;
    proxy_http_version 1.1;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
}
```

Map host port as needed (e.g. `-p 3000:3000`). Do not bind container nginx to port 80 if host nginx already uses it.

**GitHub Actions — production variables**

`VITE_*` values are **public** in the production bundle — use **Variables**, not Secrets.

**Settings → Secrets and variables → Actions → Variables:**

| Name                     | Required | Used by                                              |
| ------------------------ | -------- | ---------------------------------------------------- |
| `PROD_VITE_API_BASE_URL` | yes      | Production Docker + CI build (`src/services/api.ts`) |

The [production workflow](.github/workflows/docker-publish-production.yml) writes these into `.env.prod` via `PROD_ENV_FILE`, then builds `Dockerfile`.

**Develop image:** no GitHub Variables — pass `-e VITE_…` (or `env_file` in Compose) when you run the container.

**GitHub Container Registry (GHCR)**

| Workflow                                                               | Dockerfile       | Env at build                   | Image tags                   |
| ---------------------------------------------------------------------- | ---------------- | ------------------------------ | ---------------------------- |
| [Docker (develop)](.github/workflows/docker-publish-develop.yml)       | `Dockerfile.dev` | none                           | `develop`, `develop-<sha>`   |
| [Docker (production)](.github/workflows/docker-publish-production.yml) | `Dockerfile`     | `.env.prod` from `PROD_*` vars | `latest`, `production`, `v*` |

[CI](.github/workflows/ci.yml) runs lint, tests, and build on PRs (uses `localhost` if variables are unset).

```bash
echo "$PAT" | docker login ghcr.io -u YOUR_GITHUB_USERNAME --password-stdin
docker pull ghcr.io/<owner>/<repo>:develop      # staging
docker pull ghcr.io/<owner>/<repo>:latest       # production
```
