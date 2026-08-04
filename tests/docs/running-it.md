# Running It

## Requirements

- **Node.js v20.x** (LTS) or later
- npm (ships with Node)

## Install

From a clean clone:

```bash
npm install
```

## Run (development)

```bash
npm run dev
```

Then open `http://localhost:3000` in a browser. The SQLite database file is created automatically at `data/todo.db` on first run — no manual setup step is required.

## Run (production build)

```bash
npm run build
npm run start
```

## Test

```bash
npm run test
```

This runs all tests in `tests/` against a separate, throwaway database file (`data/test.db`), which is wiped before every test and deleted after the full run completes. Running tests never touches or depends on your real `data/todo.db`.

## Notes

- The `data/` folder is git-ignored. It is created automatically by the application on first run; nothing needs to be created manually.
- No environment variables need to be set for normal use. `DB_FILE` is used internally only by the test suite to point at a separate database file.