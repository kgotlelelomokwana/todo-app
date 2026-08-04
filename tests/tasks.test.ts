import { describe, it, expect } from 'vitest';
import { createTask, getTasks } from '@/lib/actions';

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