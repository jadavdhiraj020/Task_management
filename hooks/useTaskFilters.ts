import { useSelector } from "react-redux";
import { RootState } from "../store";
import { Task } from "../types/task";
import { useMemo } from "react";

interface UseTaskFiltersReturn {
  filteredTasks: Task[];
  totalCount: number;
  isFiltered: boolean;
}

export function useTaskFilters(): UseTaskFiltersReturn {
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const filters = useSelector((state: RootState) => state.tasks.filters);

  const isFiltered = useMemo(
    () => filters.status !== "all" || filters.priority !== "all" || filters.search !== "",
    [filters]
  );

  const filteredTasks = useMemo(() => {
    let result = [...tasks];

    if (filters.status !== "all") {
      result = result.filter((task) => task.status === filters.status);
    }

    if (filters.priority !== "all") {
      result = result.filter((task) => task.priority === filters.priority);
    }

    if (filters.search.trim() !== "") {
      const searchLower = filters.search.toLowerCase();
      result = result.filter(
        (task) =>
          task.title.toLowerCase().includes(searchLower) ||
          task.description.toLowerCase().includes(searchLower)
      );
    }

    result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    return result;
  }, [tasks, filters]);

  return {
    filteredTasks,
    totalCount: filteredTasks.length,
    isFiltered,
  };
}
