"use client";

import { ReactNode } from "react";
import TaskFiltersBar from "../../components/TaskFiltersBar";
import { useTheme } from "../../context/ThemeContext";

export default function TasksLayout({ children }: { children: ReactNode }) {
  const { sidebarOpen, toggleSidebar } = useTheme();

  return (
    <div className="flex gap-6">
      <div
        className={`fixed inset-y-0 left-0 z-30 w-64 transform bg-white p-4 pt-20 shadow-lg transition-transform duration-300 dark:bg-gray-900 lg:relative lg:inset-auto lg:z-auto lg:translate-x-0 lg:pt-0 lg:shadow-none ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between lg:hidden mb-4">
          <h2 className="text-sm font-semibold text-gray-900 dark:text-white">Filters</h2>
          <button
            onClick={toggleSidebar}
            className="rounded-lg p-1 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <h3 className="hidden lg:block text-sm font-semibold text-gray-900 dark:text-white mb-4">Filters</h3>
        <TaskFiltersBar />
      </div>

      {sidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/30 lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      <div className="flex-1 min-w-0">{children}</div>
    </div>
  );
}
