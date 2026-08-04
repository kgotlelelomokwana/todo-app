'use server';

import db from './db';
import { revalidatePath } from 'next/cache';

export type TaskStatus = 'todo' | 'in_progress' | 'complete';

export interface Task {
  id: number;
  title: string;
  description: string | null;
  due_date: string | null;
  topic: string;
  status: TaskStatus;
  archived_at: string | null;
  created_at: string;
  updated_at: string;
}

export async function createTask(data: {
  title: string;
  description?: string;
  due_date?: string;
  topic: string;
}) {
  const stmt = db.prepare(`
    INSERT INTO tasks (title, description, due_date, topic)
    VALUES (@title, @description, @due_date, @topic)
  `);

  const result = stmt.run({
    title: data.title,
    description: data.description ?? null,
    due_date: data.due_date ?? null,
    topic: data.topic,
  });

  revalidatePath('/');
  return result.lastInsertRowid;
}
export type SortField = 'topic' | 'status' | 'due_date';

export async function getTasks(sortBy: SortField = 'due_date'): Promise<Task[]> {
  const validColumns: Record<SortField, string> = {
    topic: 'topic',
    status: 'status',
    due_date: 'due_date',
  };

  const column = validColumns[sortBy] ?? 'due_date';

  const rows = db.prepare(`
    SELECT * FROM tasks
    WHERE archived_at IS NULL
    ORDER BY ${column} IS NULL, ${column} ASC
  `).all() as Task[];

  return rows;
}
export async function updateTask(
  id: number,
  data: {
    title: string;
    description?: string;
    due_date?: string;
    topic: string;
    status: TaskStatus;
  }
) {
  const stmt = db.prepare(`
    UPDATE tasks
    SET title = @title,
        description = @description,
        due_date = @due_date,
        topic = @topic,
        status = @status,
        updated_at = datetime('now')
    WHERE id = @id
  `);

  stmt.run({
    id,
    title: data.title,
    description: data.description ?? null,
    due_date: data.due_date ?? null,
    topic: data.topic,
    status: data.status,
  });

  revalidatePath('/');
}

export async function archiveTask(id: number) {
  const stmt = db.prepare(`
    UPDATE tasks
    SET archived_at = datetime('now')
    WHERE id = @id
  `);

  stmt.run({ id });
  revalidatePath('/');
}

export async function getTaskById(id: number): Promise<Task | undefined> {
  const row = db.prepare(`SELECT * FROM tasks WHERE id = @id`).get({ id }) as Task | undefined;
  return row;
}