import { getTaskById, updateTask } from '@/lib/actions';
import { redirect, notFound } from 'next/navigation';

export default async function EditTaskPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const task = await getTaskById(Number(id));

  if (!task) {
    notFound();
  }

  async function handleUpdate(formData: FormData) {
    'use server';

    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const due_date = formData.get('due_date') as string;
    const topic = formData.get('topic') as string;
    const status = formData.get('status') as 'todo' | 'in_progress' | 'complete';

    await updateTask(Number(id), {
      title: title.trim(),
      description: description.trim() || undefined,
      due_date: due_date || undefined,
      topic: topic.trim(),
      status,
    });

    redirect('/');
  }

  return (
    <main className="max-w-2xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">Edit Task</h1>
      <form action={handleUpdate} className="space-y-3 border rounded-lg p-4">
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="title">
            Title
          </label>
          <input
            id="title"
            name="title"
            type="text"
            required
            defaultValue={task.title}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="description">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            rows={2}
            defaultValue={task.description ?? ''}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div className="flex gap-3">
          <div className="flex-1">
            <label className="block text-sm font-medium mb-1" htmlFor="due_date">
              Due Date
            </label>
            <input
              id="due_date"
              name="due_date"
              type="date"
              defaultValue={task.due_date ?? ''}
              className="w-full border rounded px-3 py-2"
            />
          </div>

          <div className="flex-1">
            <label className="block text-sm font-medium mb-1" htmlFor="topic">
              Topic
            </label>
            <input
              id="topic"
              name="topic"
              type="text"
              required
              defaultValue={task.topic}
              className="w-full border rounded px-3 py-2"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="status">
            Status
          </label>
          <select
            id="status"
            name="status"
            defaultValue={task.status}
            className="w-full border rounded px-3 py-2"
          >
            <option value="todo">Todo</option>
            <option value="in_progress">In Progress</option>
            <option value="complete">Complete</option>
          </select>
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Save Changes
        </button>
      </form>
    </main>
  );
}