import { getTasks, archiveTask, SortField } from '@/lib/actions';
import { isOverdue } from '@/lib/utils';
import TaskForm from '@/app/components/TaskForm';
import SortControls from '@/app/components/SortControls';
import Link from 'next/link';

async function archiveTaskAction(id: number) {
  'use server';
  await archiveTask(id);
}

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ sort?: string }>;
}) {
  const params = await searchParams;
  const sortBy = (params.sort as SortField) ?? 'due_date';
  const tasks = await getTasks(sortBy);

  return (
    <main className="max-w-2xl mx-auto p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">My Tasks</h1>
        <Link href="/archived" className="text-blue-600 hover:underline text-sm">
          View Archived
        </Link>
      </div>
      <TaskForm />
      <SortControls currentSort={sortBy} />
      <ul className="space-y-2">
        {tasks.map((task) => (
          <li key={task.id} className="border rounded p-3 flex justify-between items-center">
            <div>
              <strong>{task.title}</strong> — {task.topic} — {task.status}
              {task.due_date && (
                <span className="text-sm text-gray-500"> (due {task.due_date})</span>
              )}
              {isOverdue(task.due_date, task.status) && (
                <span className="ml-2 text-xs font-semibold text-red-600 bg-red-100 px-2 py-0.5 rounded">
                  OVERDUE
                </span>
              )}
            </div>
            <div className="flex gap-3 text-sm">
              <Link href={`/tasks/${task.id}/edit`} className="text-blue-600 hover:underline">
                Edit
              </Link>
              <form action={archiveTaskAction.bind(null, task.id)}>
                <button type="submit" className="text-red-600 hover:underline">
                  Archive
                </button>
              </form>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}