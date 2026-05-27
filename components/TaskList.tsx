"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Task } from "../types/task";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { setTasks, removeTask } from "../store/taskSlice";
import { useTaskFilters } from "../hooks/useTaskFilters";
import { usePagination } from "../hooks/usePagination";
import { useTheme } from "../context/ThemeContext";
import TaskCard from "./TaskCard";
import ConfirmDialog from "./ConfirmDialog";

interface TaskListProps {
  initialTasks: Task[];
}

export default function TaskList({ initialTasks }: TaskListProps) {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { compactView } = useTheme();
  const { filteredTasks, totalCount, isFiltered } = useTaskFilters();
  const { currentPage, totalPages, nextPage, prevPage, goToPage, pageItems } = usePagination<Task>(totalCount, 6);

  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);

  useEffect(() => {
    dispatch(setTasks(initialTasks));
  }, [dispatch, initialTasks]);

  const handleEdit = (task: Task) => {
    router.push(`/tasks/${task.id}/edit`);
  };

  const handleDeleteClick = (id: string) => {
    setDeleteTarget(id);
  };

  const handleDeleteConfirm = async () => {
    if (deleteTarget) {
      await dispatch(removeTask(deleteTarget));
      setDeleteTarget(null);
    }
  };

  const paginatedTasks = pageItems(filteredTasks);

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {isFiltered ? `${totalCount} filtered results` : `${totalCount} tasks total`}
        </p>
      </div>

      {paginatedTasks.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <svg className="h-16 w-16 text-gray-300 dark:text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
          <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-white">No tasks found</h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {isFiltered ? "Try adjusting your filters" : "Create a new task to get started"}
          </p>
        </div>
      ) : (
        <div className={`grid gap-4 ${compactView ? "grid-cols-1" : "grid-cols-1 md:grid-cols-2"}`}>
          {paginatedTasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onEdit={handleEdit}
              onDelete={handleDeleteClick}
              compact={compactView}
            />
          ))}
        </div>
      )}

      {totalPages > 1 && (
        <div className="mt-6 flex items-center justify-center gap-2">
          <button
            onClick={prevPage}
            disabled={currentPage === 1}
            className="rounded-lg px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700 transition-colors"
          >
            Previous
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => goToPage(page)}
              className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                page === currentPage
                  ? "bg-indigo-600 text-white"
                  : "text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700"
              }`}
            >
              {page}
            </button>
          ))}
          <button
            onClick={nextPage}
            disabled={currentPage === totalPages}
            className="rounded-lg px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700 transition-colors"
          >
            Next
          </button>
        </div>
      )}

      <ConfirmDialog
        open={deleteTarget !== null}
        title="Delete Task"
        description="Are you sure you want to delete this task? This action cannot be undone."
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteTarget(null)}
        confirmLabel="Delete"
        destructive
      />
    </div>
  );
}
