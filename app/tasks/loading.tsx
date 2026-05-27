export default function TasksLoading() {
  return (
    <div>
      <div className="mb-6">
        <div className="h-8 w-32 rounded-lg bg-gray-200 dark:bg-gray-700 animate-skeleton" />
        <div className="mt-2 h-4 w-48 rounded-lg bg-gray-200 dark:bg-gray-700 animate-skeleton" />
      </div>
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
        {[1, 2, 3].map((i) => (
          <div key={i} className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="h-5 w-3/4 rounded bg-gray-200 dark:bg-gray-700 animate-skeleton" />
                <div className="mt-2 h-4 w-full rounded bg-gray-200 dark:bg-gray-700 animate-skeleton" />
                <div className="mt-1 h-4 w-2/3 rounded bg-gray-200 dark:bg-gray-700 animate-skeleton" />
              </div>
            </div>
            <div className="mt-3 flex gap-2">
              <div className="h-6 w-20 rounded-full bg-gray-200 dark:bg-gray-700 animate-skeleton" />
              <div className="h-6 w-16 rounded-full bg-gray-200 dark:bg-gray-700 animate-skeleton" />
            </div>
            <div className="mt-3 flex justify-between">
              <div className="h-4 w-24 rounded bg-gray-200 dark:bg-gray-700 animate-skeleton" />
              <div className="h-4 w-16 rounded bg-gray-200 dark:bg-gray-700 animate-skeleton" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
