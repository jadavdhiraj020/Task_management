"use client";

interface TaskStatusBadgeProps {
  status: "todo" | "in-progress" | "done";
  size?: "sm" | "md" | "lg";
  className?: string;
}

const statusConfig: Record<TaskStatusBadgeProps["status"], { label: string; classes: string }> = {
  todo: { label: "To Do", classes: "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300" },
  "in-progress": { label: "In Progress", classes: "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300 animate-pulse" },
  done: { label: "Done", classes: "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300" },
};

const sizeClasses: Record<string, string> = {
  sm: "text-xs px-2 py-0.5",
  md: "text-sm px-2.5 py-1",
  lg: "text-base px-3 py-1.5",
};

export default function TaskStatusBadge({ status, size = "md", className = "" }: TaskStatusBadgeProps) {
  const config = statusConfig[status];
  return (
    <span className={`inline-flex items-center rounded-full font-medium ${config.classes} ${sizeClasses[size]} ${className}`}>
      {config.label}
    </span>
  );
}
