# Todo App — COMS3011A Lab 1

A local-first todo application built with Next.js and SQLite. Runs entirely on your own machine — no deployment, no accounts, single user.

## Features

- Create, edit, and archive tasks (title, description, due date, topic)
- Archived tasks are never deleted — they remain viewable on a separate page
- Sort the task list by topic, status, or due date
- Fixed statuses: Todo, In-Progress, Complete
- Overdue tasks are flagged automatically (derived from the due date, not stored)
- All data persists across restarts

## Quick start

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Documentation

- [Third-Party Code](docs/third-party-code.md)
- [Database Design](docs/database-design.md)
- [Running It](docs/running-it.md)
- [AI Usage Transcript](docs/ai-usage.md)

## Running tests

```bash
npm run test
```