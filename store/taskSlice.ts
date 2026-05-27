import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Task, TaskFilters } from "../types/task";

interface TaskState {
  tasks: Task[];
  filters: TaskFilters;
  selectedTask: Task | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialFilters: TaskFilters = {
  status: "all",
  priority: "all",
  search: "",
};

const initialState: TaskState = {
  tasks: [],
  filters: initialFilters,
  selectedTask: null,
  status: "idle",
  error: null,
};

export const fetchTasks = createAsyncThunk<Task[]>("tasks/fetchTasks", async () => {
  const response = await fetch("/api/tasks");
  if (!response.ok) throw new Error("Failed to fetch tasks");
  return response.json();
});

export const createTask = createAsyncThunk<Task, Omit<Task, "id" | "createdAt">>(
  "tasks/createTask",
  async (taskData) => {
    const response = await fetch("/api/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(taskData),
    });
    if (!response.ok) throw new Error("Failed to create task");
    return response.json();
  }
);

export const editTask = createAsyncThunk<Task, { id: string; data: Partial<Task> }>(
  "tasks/editTask",
  async ({ id, data }) => {
    const response = await fetch(`/api/tasks/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error("Failed to update task");
    return response.json();
  }
);

export const removeTask = createAsyncThunk<string, string>(
  "tasks/removeTask",
  async (id) => {
    const response = await fetch(`/api/tasks/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) throw new Error("Failed to delete task");
    return id;
  }
);

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    setTasks(state, action: PayloadAction<Task[]>) {
      state.tasks = action.payload;
    },
    addTask(state, action: PayloadAction<Task>) {
      state.tasks.push(action.payload);
    },
    updateTask(state, action: PayloadAction<{ id: string; data: Partial<Task> }>) {
      const index = state.tasks.findIndex((t) => t.id === action.payload.id);
      if (index !== -1) {
        state.tasks[index] = { ...state.tasks[index], ...action.payload.data };
      }
    },
    deleteTask(state, action: PayloadAction<string>) {
      state.tasks = state.tasks.filter((t) => t.id !== action.payload);
    },
    setSelectedTask(state, action: PayloadAction<Task | null>) {
      state.selectedTask = action.payload;
    },
    setFilters(state, action: PayloadAction<Partial<TaskFilters>>) {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearFilters(state) {
      state.filters = initialFilters;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.tasks = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch tasks";
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.tasks.push(action.payload);
      })
      .addCase(editTask.fulfilled, (state, action) => {
        const index = state.tasks.findIndex((t) => t.id === action.payload.id);
        if (index !== -1) {
          state.tasks[index] = action.payload;
        }
      })
      .addCase(removeTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter((t) => t.id !== action.payload);
      });
  },
});

export const {
  setTasks,
  addTask,
  updateTask,
  deleteTask,
  setSelectedTask,
  setFilters,
  clearFilters,
} = taskSlice.actions;

export default taskSlice.reducer;
