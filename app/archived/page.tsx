import { getArchivedTasks, unarchiveTask } from '@/lib/actions';
import Link from 'next/link';

async function unarchiveTaskAction(id: number) {
  'use server';
  await unarchiveTask(id);
}

export default async function ArchivedPage() {
  const tasks = await getArchivedTasks();

  return (
    <main className="max-w-2xl mx-auto p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Archived Tasks</h1>
        <Link href="/" className="text-blue-600 hover:underline text-sm">
          Back to Tasks
        </Link>
      </div>

      {tasks.length === 0 && (
        <p className="text-gray-500">No archived tasks yet.</p>
      )}

      <ul className="space-y-2">
        {tasks.map((task) => (
          <li key={task.id} className="border rounded p-3 flex justify-between items-center bg-gray-50">
            <div>
              <strong>{task.title}</strong> — {task.topic} — {task.status}
              {task.due_date && (
                <span className="text-sm text-gray-500"> (due {task.due_date})</span>
              )}
            </div>
            <form action={unarchiveTaskAction.bind(null, task.id)}>
              <button type="submit" className="text-blue-600 hover:underline text-sm">
                Unarchive
              </button>
            </form>
          </li>
        ))}
      </ul>
    </main>
  );
}