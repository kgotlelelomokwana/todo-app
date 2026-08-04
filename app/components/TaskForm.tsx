'use client';

import { useRef } from 'react';
import { createTask } from '@/lib/actions';

export default function TaskForm() {
  const formRef = useRef<HTMLFormElement>(null);

  async function handleSubmit(formData: FormData) {
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const due_date = formData.get('due_date') as string;
    const topic = formData.get('topic') as string;

    if (!title.trim() || !topic.trim()) {
      alert('Title and Topic are required.');
      return;
    }

    await createTask({
      title: title.trim(),
      description: description.trim() || undefined,
      due_date: due_date || undefined,
      topic: topic.trim(),
    });

    formRef.current?.reset();
  }

  return (
    <form ref={formRef} action={handleSubmit} className="space-y-3 border rounded-lg p-4 mb-6">
      <h2 className="font-semibold text-lg">New Task</h2>

      <div>
        <label className="block text-sm font-medium mb-1" htmlFor="title">
          Title
        </label>
        <input
          id="title"
          name="title"
          type="text"
          required
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
            className="w-full border rounded px-3 py-2"
          />
        </div>
      </div>

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Add Task
      </button>
    </form>
  );
}