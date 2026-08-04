# AI Usage Transcript

AI assistance (Claude) was used throughout this project for planning, code generation, and debugging. This document summarises how it was used, the constraints placed on it, and specific instances where AI output was identified as incorrect or unsuitable and redirected.

## Constraints stated up front

Before any code was generated, the following constraints were set:

- A step-by-step guided approach, with each phase confirmed before proceeding to the next, rather than the AI generating the whole application at once.
- Complete file contents provided for any edit, rather than partial diffs, to reduce the risk of desynchronisation between what the AI assumed was in a file and what was actually there.
- Explicit tech stack decisions made and confirmed before scaffolding began (Next.js App Router, better-sqlite3 over an async driver, no ORM, Vitest over Jest).

## Planning

The AI proposed the initial tech stack and schema design before any code was written, including the decision to store `archived_at` as a nullable timestamp rather than deleting rows, and to compute the overdue flag at read time rather than storing it — both directly shaping the database design documented in `docs/database-design.md`.

## Code generation

Code was generated incrementally: database schema and connection, server actions (create/read/update/archive), UI components (task form, sort controls, task list), the edit and archived-task pages, and finally the test suite. Each phase was tested manually before moving to the next.

## Debugging — instances of redirecting incorrect or unsuitable AI output

Several points in the build required identifying that an AI-provided answer was incomplete or wrong, and asking for a correction rather than accepting it as-is:

1. **Tautological test rejected.** When first asked for a task-creation test, the AI initially proposed a second test that asserted nothing meaningful (checking that an empty-topic task "resolves"). This was caught by the AI itself mid-response and replaced with a test that asserts real behaviour (default status and null due date) before being accepted into the codebase.

2. **File-location mismatches caught via error output.** On two separate occasions (a component import, and later a documentation folder), files were created in the wrong directory due to VSCode's active-folder context when creating new files. Both were only found by actually running the compiler (`npx tsc --noEmit`) and `git status` rather than assuming the AI's instructions had been followed correctly, and were corrected using `git mv` to preserve file history rather than delete-and-recreate.

3. **Test suite failures required investigating the actual error, not just retrying.** The initial Vitest setup failed with a Windows-specific file-locking error (`EBUSY`) when trying to delete a SQLite database file between tests. Rather than accepting a workaround that avoided the real cause, the fix addressed the underlying issue (closing the database connection before deletion, and clearing table contents via SQL instead of deleting the file between individual tests).

4. **`revalidatePath` failing outside a request context.** Tests calling server actions directly failed because `revalidatePath` assumes it is running inside an actual Next.js request. This was diagnosed from the real error message (rather than being pre-empted by the AI) and fixed by mocking `next/cache` in the test setup file, scoped only to the test environment.

5. **"Server Actions must be async functions" build error.** A synchronous helper function (`isOverdue`) was placed in a file marked `'use server'`, which Next.js does not allow. This was only caught by running a full build, not just the dev server, and fixed by extracting the function into a separate, non-server utility file — a decision that also improved code organisation and made the function independently testable.

## Traceability

All code shipped in this repository reflects the decisions and corrections described above; no AI-generated code was accepted without being run and verified (via `npm run dev`, `npx tsc --noEmit`, or `npm run test`) before being committed.