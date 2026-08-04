import { describe, it, expect } from 'vitest';
import { createTask, getTasks, getArchivedTasks, archiveTask } from '@/lib/actions';
import { isOverdue } from '@/lib/utils';

describe('createTask', () => {
  it('creates a task and it appears in the active task list', async () => {
    await createTask({
      title: 'Write lab report',
      topic: 'COMS3011A',
      due_date: '2026-08-10',
    });

    const tasks = await getTasks();

    expect(tasks).toHaveLength(1);
    expect(tasks[0].title).toBe('Write lab report');
    expect(tasks[0].topic).toBe('COMS3011A');
    expect(tasks[0].status).toBe('todo');
  });

  it('defaults status to todo and due_date to null when not provided', async () => {
    await createTask({
      title: 'No due date task',
      topic: 'General',
    });

    const tasks = await getTasks();

    expect(tasks[0].status).toBe('todo');
    expect(tasks[0].due_date).toBeNull();
  });
});

describe('archiveTask', () => {
  it('removes an archived task from the active list but keeps it viewable', async () => {
    const id = await createTask({
      title: 'Old task',
      topic: 'General',
    });

    await archiveTask(Number(id));

    const activeTasks = await getTasks();
    const archivedTasks = await getArchivedTasks();

    expect(activeTasks).toHaveLength(0);
    expect(archivedTasks).toHaveLength(1);
    expect(archivedTasks[0].title).toBe('Old task');
    expect(archivedTasks[0].archived_at).not.toBeNull();
  });
});

describe('overdue rule', () => {
  it('marks a task overdue only when due_date is in the past and status is not complete', () => {
    expect(isOverdue('2020-01-01', 'todo')).toBe(true);
    expect(isOverdue('2020-01-01', 'complete')).toBe(false);
    expect(isOverdue('2099-01-01', 'todo')).toBe(false);
    expect(isOverdue(null, 'todo')).toBe(false);
  });
});