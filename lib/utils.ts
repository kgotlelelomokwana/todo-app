export type TaskStatus = 'todo' | 'in_progress' | 'complete';

export function isOverdue(due_date: string | null, status: TaskStatus): boolean {
  if (!due_date || status === 'complete') return false;
  return new Date(due_date) < new Date(new Date().toDateString());
}