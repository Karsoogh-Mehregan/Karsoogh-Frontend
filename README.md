# Karsoogh Frontend

This is the frontend application for Karsoogh, built with React and TypeScript.

## Tech Stack

- **Core:** React 19 & TypeScript
- **Build Tool:** Vite 7
- **Styling:** Tailwind CSS 3 & PostCSS
- **Routing:** React Router DOM 7
- **Animation:** Framer Motion
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
    Set up your environment variables by copying the example file.

    ```bash
    cp .env.example .env
    ```

    - Update `VITE_API_BASE_URL` in `.env` if your backend is running on a different URL.

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

### Production (Docker)

The production image serves the built SPA with **nginx on port 3000** inside the container. Host nginx (or another reverse proxy) should terminate TLS and listen on **port 80**, then forward to the container.

**Build** (API URL is required and baked into the bundle at build time):

```bash
docker build \
  --build-arg VITE_API_BASE_URL=https://api.your-domain.com \
  -t karsoogh-frontend .
```

**Run:**

```bash
docker run -d --name karsoogh-frontend -p 3000:3000 karsoogh-frontend
```

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

**GitHub Container Registry (GHCR)**

Images are published by the `publish-image` job in [CI](.github/workflows/ci.yml) after lint, tests, and build pass — only on **`main`** or **`v*` tags** (not on pull requests). CI builds the app once; the Docker job packages that `dist/` artifact (no second Vite build).

- **`main`** → tags `latest` + commit SHA.
- **`v*` tags** → version tag + SHA (`latest` is not updated).

**Manual publish:** Actions → CI → **Run workflow** → choose branch **`main`** (or a `v*` tag). Running from another branch only runs tests; publish is skipped.

Pull requests run CI without publishing; if `VITE_API_BASE_URL` is unset on a PR, the Vite build uses the `localhost` fallback in code. On **`main`** / **`v*` tags**, CI fails early if the variable is missing.

1. Add a **repository variable**: `VITE_API_BASE_URL` = `https://api.your-domain.com` (Settings → Secrets and variables → Actions → Variables). Required for `main` and release tags; baked into the bundle during `npm run build` in CI.
2. Grant workflow **read and write** permissions for packages (Settings → Actions → General).
3. Pull the image (replace `<owner>` / `<repo>` with your GitHub repository):

   ```bash
   echo "$PAT" | docker login ghcr.io -u YOUR_GITHUB_USERNAME --password-stdin
   docker pull ghcr.io/<owner>/<repo>:latest
   ```

   Use a [personal access token](https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-container-registry#authenticating-with-a-personal-access-token-classic) with `read:packages`. New GHCR packages are **private** by default; make the package public under **Packages** if you need anonymous pulls.

For staging or multiple environments later, use [GitHub Environments](https://docs.github.com/en/actions/deployment/targeting-different-environments) with per-environment `VITE_API_BASE_URL` values.
