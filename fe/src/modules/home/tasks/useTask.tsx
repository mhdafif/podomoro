import type { DropResult } from "@hello-pangea/dnd";
import { useState } from "react";

import type { ITask } from "@/store/task/ITaskStore";
import useTaskStore from "@/store/task/taskStore";

const useTask = () => {
  /*======================== Store ======================== */

  const {
    tasks,
    activeTaskId,
    addTask,
    deleteTask,
    setActiveTask,
    reorderTasks,
  } = useTaskStore();

  /*======================== UseState ======================== */

  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState<string | null>(null);

  /*======================== Handlers ======================== */

  const handleAddTask = () => {
    if (newTaskTitle.trim()) {
      addTask(newTaskTitle);
      setNewTaskTitle("");
    }
  };

  const handleDeleteTask = (taskId: string) => {
    setTaskToDelete(taskId);
    setShowDeleteDialog(true);
  };

  const confirmDeleteTask = () => {
    if (taskToDelete) {
      deleteTask(taskToDelete);
    }
    setShowDeleteDialog(false);
    setTaskToDelete(null);
  };

  const cancelDeleteTask = () => {
    setShowDeleteDialog(false);
    setTaskToDelete(null);
  };

  const handleSetActiveTask = (taskId: string) => {
    const newActiveId = activeTaskId === taskId ? null : taskId;
    setActiveTask(newActiveId);
  };

  const handleReorderTasks = (reorderedTasks: ITask[]) => {
    reorderTasks(reorderedTasks);
  };

  const getTaskToDeleteTitle = () => {
    const task = tasks.find((t) => t.id === taskToDelete);
    return task?.title || "";
  };

  const handleEnterAddTask = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleAddTask();
    }
  };

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const items = Array.from(tasks);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    handleReorderTasks(items);
  };

  /*======================== Computed ======================== */

  const sortedTasks = [...tasks].sort((a, b) => a.order - b.order);
  const activeTask = tasks.find((task) => task.id === activeTaskId);

  /*======================== Return ======================== */

  return {
    // State
    tasks: sortedTasks,
    activeTaskId,
    activeTask,
    newTaskTitle,
    showDeleteDialog,
    taskToDelete,

    // Handlers
    setNewTaskTitle,
    handleAddTask,
    handleDeleteTask,
    confirmDeleteTask,
    cancelDeleteTask,
    handleSetActiveTask,
    handleReorderTasks,
    getTaskToDeleteTitle,
    handleEnterAddTask,
    onDragEnd,
  };
};

export default useTask;
