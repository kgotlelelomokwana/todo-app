# Database Design

## Engine

SQLite, accessed via `better-sqlite3`. The database file lives at `data/todo.db` (or `data/test.db` in tests), created automatically on first run.

## Schema

A single table is used, as the application has no user accounts and no relationships beyond the task itself.

```sql
CREATE TABLE tasks (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  description TEXT,
  due_date TEXT,
  topic TEXT NOT NULL,
  status TEXT NOT NULL CHECK(status IN ('todo', 'in_progress', 'complete')) DEFAULT 'todo',
  archived_at TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);
```

## Design decisions

- **Archiving is a nullable timestamp, not a delete.** `archived_at IS NULL` means active; a non-null value means archived and when. This satisfies the brief's requirement that archived tasks remain viewable — nothing is ever deleted from the table, and no rows are copied elsewhere.
- **Status is a fixed, database-enforced set.** The `CHECK` constraint restricts `status` to exactly `todo`, `in_progress`, or `complete`, matching the brief's requirement that these are fixed and not user-customisable.
- **Overdue is not stored anywhere.** It is derived at read time (see `lib/utils.ts`, `isOverdue`) from comparing `due_date` against the current date, only when `status !== 'complete'`. Storing "overdue" as a column or status value would require a background process to keep it in sync as time passes, which is unnecessary complexity for a value that can always be computed from data already on hand.
- **`due_date` is stored as `TEXT`**, in `YYYY-MM-DD` format, matching the native output of an HTML `<input type="date">`. SQLite has no dedicated date type; storing it as ISO-format text keeps it both human-readable and lexicographically sortable.
- **Timestamps (`created_at`, `updated_at`) default to `datetime('now')`** at the database level, so every insert/update is timestamped even if the application layer forgets to set one explicitly.

## Relationships

There is only one table, so there are no foreign keys or joins in this schema. All task data — including its topic — is stored directly on the `tasks` row rather than normalised into a separate `topics` table, since topics are free-text values entered per task rather than a fixed, reusable list.