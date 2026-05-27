import { useState, useCallback } from "react";
import { Task } from "../types/task";

interface FormValues {
  title: string;
  description: string;
  priority: Task["priority"];
  status: Task["status"];
  dueDate: string;
  tags: string[];
  assignedTo: string;
}

interface FormErrors {
  title?: string;
  dueDate?: string;
}

interface UseTaskFormReturn {
  values: FormValues;
  handleChange: (field: keyof FormValues, value: FormValues[keyof FormValues]) => void;
  handleSubmit: (onSubmit: (values: FormValues) => void) => void;
  errors: FormErrors;
  reset: () => void;
}

const defaultValues: FormValues = {
  title: "",
  description: "",
  priority: "medium",
  status: "todo",
  dueDate: "",
  tags: [],
  assignedTo: "",
};

export function useTaskForm(initialValues?: Partial<Task>): UseTaskFormReturn {
  const getInitial = (): FormValues => ({
    title: initialValues?.title || "",
    description: initialValues?.description || "",
    priority: initialValues?.priority || "medium",
    status: initialValues?.status || "todo",
    dueDate: initialValues?.dueDate ? initialValues.dueDate.split("T")[0] : "",
    tags: initialValues?.tags || [],
    assignedTo: initialValues?.assignedTo || "",
  });

  const [values, setValues] = useState<FormValues>(getInitial);
  const [errors, setErrors] = useState<FormErrors>({});

  const handleChange = useCallback(
    (field: keyof FormValues, value: FormValues[keyof FormValues]) => {
      setValues((prev) => ({ ...prev, [field]: value }));
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    },
    []
  );

  const validate = useCallback((): boolean => {
    const newErrors: FormErrors = {};

    if (!values.title.trim()) {
      newErrors.title = "Title is required";
    }

    if (!values.dueDate) {
      newErrors.dueDate = "Due date is required";
    } else {
      const parsed = new Date(values.dueDate);
      if (isNaN(parsed.getTime())) {
        newErrors.dueDate = "Invalid date";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [values]);

  const handleSubmit = useCallback(
    (onSubmit: (values: FormValues) => void) => {
      if (validate()) {
        onSubmit(values);
      }
    },
    [values, validate]
  );

  const reset = useCallback(() => {
    setValues(getInitial());
    setErrors({});
  }, []);

  return { values, handleChange, handleSubmit, errors, reset };
}
