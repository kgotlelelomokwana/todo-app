import Link from 'next/link';

const SORT_OPTIONS = [
  { value: 'due_date', label: 'Due Date' },
  { value: 'topic', label: 'Topic' },
  { value: 'status', label: 'Status' },
] as const;

export default function SortControls({ currentSort }: { currentSort: string }) {
  return (
    <div className="flex gap-2 mb-4 text-sm">
      <span className="text-gray-500">Sort by:</span>
      {SORT_OPTIONS.map((option) => (
        <Link
          key={option.value}
          href={`/?sort=${option.value}`}
          className={
            currentSort === option.value
              ? 'font-semibold text-blue-600'
              : 'text-gray-600 hover:underline'
          }
        >
          {option.label}
        </Link>
      ))}
    </div>
  );
}
