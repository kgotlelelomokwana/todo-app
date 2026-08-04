import { getTasks } from '@/lib/actions';
import TaskForm from '@/app/components/TaskForm';

export default async function Home() {
  const tasks = await getTasks();

  return (
    <main className="max-w-2xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">My Tasks</h1>
      <TaskForm />
      <ul className="space-y-2">
        {tasks.map((task) => (
          <li key={task.id} className="border rounded p-3">
            <strong>{task.title}</strong> — {task.topic} — {task.status}
            {task.due_date && <span className="text-sm text-gray-500"> (due {task.due_date})</span>}
          </li>
        ))}
      </ul>
    </main>
  );
}