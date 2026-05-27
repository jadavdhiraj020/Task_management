import TaskList from "../../components/TaskList";
import { Task } from "../../types/task";

export const dynamic = "force-dynamic";

async function fetchTasks(): Promise<Task[]> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const res = await fetch(`${baseUrl}/api/tasks`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch tasks");
  return res.json();
}

export default async function TasksPage() {
  const tasks = await fetchTasks();

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Tasks</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Manage and track all your tasks</p>
      </div>
      <TaskList initialTasks={tasks} />
    </div>
  );
}
