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

    - Update `API_BASE_URL` in `.env` if your backend is running on a different URL.

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
