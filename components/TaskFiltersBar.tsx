"use client";

import { useSelector } from "react-redux";
import { RootState } from "../store";
import { setFilters, clearFilters } from "../store/taskSlice";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { TaskStatus, TaskPriority } from "../types/task";

interface TaskFiltersBarProps {
  className?: string;
}

export default function TaskFiltersBar({ className = "" }: TaskFiltersBarProps) {
  const dispatch = useAppDispatch();
  const filters = useSelector((state: RootState) => state.tasks.filters);

  const isFiltered = filters.status !== "all" || filters.priority !== "all" || filters.search !== "";

  return (
    <div className={`flex flex-col gap-4 ${className}`}>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Search</label>
        <input
          type="text"
          placeholder="Search tasks..."
          value={filters.search}
          onChange={(e) => dispatch(setFilters({ search: e.target.value }))}
          className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:placeholder-gray-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Status</label>
        <select
          value={filters.status}
          onChange={(e) => dispatch(setFilters({ status: e.target.value as TaskStatus | "all" }))}
          className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
        >
          <option value="all">All Statuses</option>
          <option value="todo">To Do</option>
          <option value="in-progress">In Progress</option>
          <option value="done">Done</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Priority</label>
        <select
          value={filters.priority}
          onChange={(e) => dispatch(setFilters({ priority: e.target.value as TaskPriority | "all" }))}
          className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
        >
          <option value="all">All Priorities</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>

      {isFiltered && (
        <button
          onClick={() => dispatch(clearFilters())}
          className="rounded-lg bg-gray-100 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 transition-colors"
        >
          Clear Filters
        </button>
      )}
    </div>
  );
}
