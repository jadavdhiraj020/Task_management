"use client";

interface ErrorProps {
  error: Error;
  reset: () => void;
}

export default function TasksError({ error, reset }: ErrorProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/30">
        <svg className="h-8 w-8 text-red-600 dark:text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      <h2 className="mt-4 text-xl font-semibold text-gray-900 dark:text-white">Something went wrong</h2>
      <p className="mt-2 text-sm text-gray-500 dark:text-gray-400 max-w-md">
        {error.message || "An unexpected error occurred while loading tasks."}
      </p>
      <button
        onClick={reset}
        className="mt-6 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-indigo-700 transition-colors"
      >
        Try Again
      </button>
    </div>
  );
}
