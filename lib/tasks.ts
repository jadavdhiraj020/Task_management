import { Task } from "../types/task";

let tasks: Task[] = [
  {
    id: "1",
    title: "Design System Setup",
    description: "Create a comprehensive design system with reusable components, color tokens, and typography scales for the project.",
    priority: "high",
    status: "in-progress",
    dueDate: "2026-06-01T00:00:00.000Z",
    createdAt: "2026-05-20T10:00:00.000Z",
    tags: ["design", "ui"],
    assignedTo: "Alice",
  },
  {
    id: "2",
    title: "API Integration",
    description: "Integrate the REST API endpoints with the frontend application and handle error states properly.",
    priority: "high",
    status: "todo",
    dueDate: "2026-06-05T00:00:00.000Z",
    createdAt: "2026-05-21T08:30:00.000Z",
    tags: ["backend", "api"],
    assignedTo: "Bob",
  },
  {
    id: "3",
    title: "User Authentication",
    description: "Implement user login and registration flow with JWT tokens and session management.",
    priority: "medium",
    status: "done",
    dueDate: "2026-05-25T00:00:00.000Z",
    createdAt: "2026-05-18T14:00:00.000Z",
    tags: ["auth", "security"],
    assignedTo: "Charlie",
  },
  {
    id: "4",
    title: "Write Unit Tests",
    description: "Add comprehensive unit tests for all utility functions and Redux slices.",
    priority: "low",
    status: "todo",
    dueDate: "2026-06-10T00:00:00.000Z",
    createdAt: "2026-05-22T09:00:00.000Z",
    tags: ["testing"],
    assignedTo: "Alice",
  },
  {
    id: "5",
    title: "Performance Optimization",
    description: "Optimize bundle size, implement code splitting, and improve Core Web Vitals scores.",
    priority: "medium",
    status: "todo",
    dueDate: "2026-05-20T00:00:00.000Z",
    createdAt: "2026-05-19T11:00:00.000Z",
    tags: ["performance"],
    assignedTo: "Bob",
  },
];

export function getTasks(): Task[] {
  return tasks;
}

export function getTaskById(id: string): Task | undefined {
  return tasks.find((t) => t.id === id);
}

export function addTask(task: Task): Task {
  tasks.push(task);
  return task;
}

export function updateTask(id: string, data: Partial<Task>): Task | undefined {
  const index = tasks.findIndex((t) => t.id === id);
  if (index === -1) return undefined;
  tasks[index] = { ...tasks[index], ...data };
  return tasks[index];
}

export function deleteTask(id: string): boolean {
  const index = tasks.findIndex((t) => t.id === id);
  if (index === -1) return false;
  tasks.splice(index, 1);
  return true;
}
