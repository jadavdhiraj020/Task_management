import { NextRequest, NextResponse } from "next/server";
import { getTasks, addTask } from "../../../lib/tasks";
import { Task, TaskStatus, TaskPriority } from "../../../types/task";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const status = searchParams.get("status") as TaskStatus | null;
  const priority = searchParams.get("priority") as TaskPriority | null;
  const search = searchParams.get("search");

  let tasks = getTasks();

  if (status) {
    tasks = tasks.filter((t) => t.status === status);
  }

  if (priority) {
    tasks = tasks.filter((t) => t.priority === priority);
  }

  if (search) {
    const searchLower = search.toLowerCase();
    tasks = tasks.filter(
      (t) =>
        t.title.toLowerCase().includes(searchLower) ||
        t.description.toLowerCase().includes(searchLower)
    );
  }

  return NextResponse.json(tasks);
}

export async function POST(request: NextRequest) {
  const body = await request.json() as Omit<Task, "id" | "createdAt">;

  if (!body.title || body.title.trim() === "") {
    return NextResponse.json({ error: "Title is required" }, { status: 400 });
  }

  if (!body.dueDate || isNaN(new Date(body.dueDate).getTime())) {
    return NextResponse.json({ error: "Valid due date is required" }, { status: 400 });
  }

  const newTask: Task = {
    id: crypto.randomUUID(),
    title: body.title,
    description: body.description || "",
    priority: body.priority || "medium",
    status: body.status || "todo",
    dueDate: new Date(body.dueDate).toISOString(),
    createdAt: new Date().toISOString(),
    tags: body.tags || [],
    assignedTo: body.assignedTo || "",
  };

  const created = addTask(newTask);
  return NextResponse.json(created, { status: 201 });
}
