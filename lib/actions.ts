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

export async function getTasks(): Promise<Task[]> {
  const rows = db.prepare(`
    SELECT * FROM tasks WHERE archived_at IS NULL ORDER BY created_at DESC
  `).all() as Task[];
  return rows;
}