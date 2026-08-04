# Third-Party Code

The following third-party packages were installed for this project, and why each was chosen.

## Runtime dependencies

- **next** — the framework itself. Chosen because it was specified in the brief and provides Server Actions, which let form submissions call server-side database logic directly without hand-writing API routes.
- **react** / **react-dom** — required peer dependencies of Next.js.
- **better-sqlite3** — the SQLite driver. Chosen over async alternatives (e.g. `node-sqlite3`) because it's synchronous, which simplifies reasoning about transactions in a single-user, local-first app with no concurrent request load to worry about.
- **tailwindcss** — utility-first CSS. Chosen to build a functional interface quickly without hand-rolling a separate stylesheet, given the assignment's focus is on application behaviour rather than visual design.

## Development dependencies

- **typescript** — static typing, chosen to catch schema/shape mismatches between the database layer and the UI at compile time rather than at runtime.
- **vitest** — the test runner. Chosen because it shares Vite's config style, runs TypeScript natively without a separate build step, and integrates cleanly with a Next.js + TypeScript project.
- **@vitest/coverage-v8** — optional test coverage reporting, using V8's built-in coverage instrumentation.
- **tsx** — used briefly during development to run standalone TypeScript scripts (e.g. verifying the database connection) outside of the Next.js dev server.
- **@types/better-sqlite3** — TypeScript type definitions for `better-sqlite3`, since the package itself does not ship types.