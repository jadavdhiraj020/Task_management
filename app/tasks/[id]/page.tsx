import Link from "next/link";
import { notFound } from "next/navigation";
import { Task } from "../../../types/task";
import TaskStatusBadge from "../../../components/TaskStatusBadge";

export const dynamic = "force-dynamic";

interface TaskDetailPageProps {
  params: Promise<{ id: string }>;
}

const priorityColors: Record<Task["priority"], string> = {
  low: "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300",
  medium: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300",
  high: "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300",
};

async function fetchTask(id: string): Promise<Task | null> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const res = await fetch(`${baseUrl}/api/tasks/${id}`, { cache: "no-store" });
  if (!res.ok) return null;
  return res.json();
}

export default async function TaskDetailPage({ params }: TaskDetailPageProps) {
  const { id } = await params;
  const task = await fetchTask(id);

  if (!task) {
    notFound();
  }

  const isOverdue = new Date(task.dueDate) < new Date() && task.status !== "done";

  return (
    <div className="max-w-2xl">
      <div className="mb-6">
        <Link
          href="/tasks"
          className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Back to Tasks
        </Link>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{task.title}</h1>
            <div className="mt-2 flex items-center gap-2 flex-wrap">
              <TaskStatusBadge status={task.status} />
              <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-sm font-medium ${priorityColors[task.priority]}`}>
                {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)} Priority
              </span>
              {isOverdue && (
                <span className="inline-flex items-center gap-1 rounded-full bg-red-100 px-2.5 py-1 text-sm font-medium text-red-700 dark:bg-red-900 dark:text-red-300">
                  Overdue
                </span>
              )}
            </div>
          </div>
          <Link
            href={`/tasks/${task.id}/edit`}
            className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 transition-colors"
          >
            Edit
          </Link>
        </div>

        <div className="mt-6 space-y-4">
          <div>
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Description</h3>
            <p className="mt-1 text-gray-900 dark:text-gray-100">{task.description || "No description"}</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Due Date</h3>
              <p className="mt-1 text-gray-900 dark:text-gray-100">
                {new Date(task.dueDate).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
              </p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Created At</h3>
              <p className="mt-1 text-gray-900 dark:text-gray-100">
                {new Date(task.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
              </p>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Assigned To</h3>
            <p className="mt-1 text-gray-900 dark:text-gray-100">{task.assignedTo || "Unassigned"}</p>
          </div>

          {task.tags.length > 0 && (
            <div>
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Tags</h3>
              <div className="mt-2 flex gap-2 flex-wrap">
                {task.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-md bg-indigo-50 px-2.5 py-1 text-sm font-medium text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
