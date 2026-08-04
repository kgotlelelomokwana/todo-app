import { createTask, getTasks } from '@/lib/actions';

export default async function Home() {
  const tasks = await getTasks();

  async function handleCreate() {
    'use server';
    await createTask({
      title: 'Sample task from server action',
      topic: 'General',
      due_date: '2026-08-15',
    });
  }

  return (
    <main style={{ padding: '2rem' }}>
      <h1>Debug: Tasks</h1>
      <form action={handleCreate}>
        <button
          type="submit"
          style={{
            padding: '0.5rem 1rem',
            background: '#2563eb',
            color: 'white',
            borderRadius: '4px',
            marginBottom: '1rem',
          }}
        >
          Create sample task
        </button>
      </form>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            {task.title} — {task.topic} — {task.status}
          </li>
        ))}
      </ul>
    </main>
  );
}