"use client";

import { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Task } from "../types/task";
import LoadingSpinner from "../components/LoadingSpinner";

interface DashboardStats {
  total: number;
  todo: number;
  inProgress: number;
  done: number;
  overdue: number;
}

function DashboardContent() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");
  const [stats, setStats] = useState<DashboardStats>({ total: 0, todo: 0, inProgress: 0, done: 0, overdue: 0 });

  useEffect(() => {
    const hasToken = document.cookie.split(";").some((item) => item.trim().startsWith("auth_token="));
    if (hasToken && error === "unauthorized") {
      const url = new URL(window.location.href);
      url.searchParams.delete("error");
      window.history.replaceState({}, "", url.pathname + url.search);
      // Force reload or state update if necessary, or just rely on local state/navigation.
      window.location.reload();
    }
  }, [error]);

  useEffect(() => {
    fetch("/api/tasks")
      .then((res) => res.json())
      .then((tasks: Task[]) => {
        const now = new Date();
        setStats({
          total: tasks.length,
          todo: tasks.filter((t) => t.status === "todo").length,
          inProgress: tasks.filter((t) => t.status === "in-progress").length,
          done: tasks.filter((t) => t.status === "done").length,
          overdue: tasks.filter((t) => new Date(t.dueDate) < now && t.status !== "done").length,
        });
      })
      .catch(() => {});
  }, []);

  const cards = [
    { label: "Total Tasks", value: stats.total, color: "from-indigo-500 to-purple-600", icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" },
    { label: "To Do", value: stats.todo, color: "from-gray-500 to-gray-600", icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" },
    { label: "In Progress", value: stats.inProgress, color: "from-blue-500 to-cyan-600", icon: "M13 10V3L4 14h7v7l9-11h-7z" },
    { label: "Done", value: stats.done, color: "from-green-500 to-emerald-600", icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" },
    { label: "Overdue", value: stats.overdue, color: "from-red-500 to-rose-600", icon: "M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" },
  ];

  return (
    <div>
      {error === "unauthorized" && (
        <div className="mb-6 rounded-lg border border-amber-200 bg-amber-50 p-4 dark:border-amber-800 dark:bg-amber-900/30">
          <p className="text-sm font-medium text-amber-800 dark:text-amber-200">
            Please set an auth_token cookie to access protected pages.
          </p>
        </div>
      )}

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
        <p className="mt-1 text-gray-500 dark:text-gray-400">Overview of your task management workspace</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {cards.map((card) => (
          <div
            key={card.label}
            className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900"
          >
            <div className="flex items-center gap-3">
              <div className={`flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br ${card.color}`}>
                <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d={card.icon} />
                </svg>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{card.value}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{card.label}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 flex gap-3">
        <Link
          href="/tasks"
          className="inline-flex items-center rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-indigo-700 transition-colors"
        >
          View All Tasks
        </Link>
        <Link
          href="/create"
          className="inline-flex items-center rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 transition-colors"
        >
          Create New Task
        </Link>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <Suspense fallback={<LoadingSpinner size="lg" label="Loading dashboard..." className="py-16" />}>
      <DashboardContent />
    </Suspense>
  );
}
