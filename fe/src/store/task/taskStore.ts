import { type StateCreator, create } from "zustand";
import { devtools, persist } from "zustand/middleware";

import type { ITask, ITaskState, ITaskStore } from "./ITaskStore";

const initialState: ITaskState = {
  tasks: [],
  activeTaskId: null,
};

const taskStoreSlice: StateCreator<
  ITaskStore,
  [["zustand/devtools", unknown], ["zustand/persist", unknown]]
> = (set, get) => ({
  ...initialState,

  addTask: (title: string) => {
    const newTask: ITask = {
      id: Date.now().toString(),
      title: title.trim(),
      completedTimeMinutes: 0,
      isActive: false,
      createdAt: new Date(),
      order: get().tasks.length,
    };

    set(
      (state) => ({
        tasks: [...state.tasks, newTask],
      }),
      false,
      "task-add"
    );
  },

  deleteTask: (id: string) => {
    set(
      (state) => ({
        tasks: state.tasks.filter((task) => task.id !== id),
        activeTaskId: state.activeTaskId === id ? null : state.activeTaskId,
      }),
      false,
      "task-delete"
    );
  },

  setActiveTask: (id: string | null) => {
    set(
      (state) => ({
        tasks: state.tasks.map((task) => ({
          ...task,
          isActive: task.id === id,
        })),
        activeTaskId: id,
      }),
      false,
      "task-set-active"
    );
  },

  incrementTaskCycles: (id: string) => {
    set(
      (state) => ({
        tasks: state.tasks.map((task) =>
          task.id === id
            ? { ...task, completedTimeMinutes: task.completedTimeMinutes + 25 } // Add 25 minutes for each work session
            : task
        ),
      }),
      false,
      "task-increment-cycles"
    );
  },

  addTaskTime: (id: string, minutes: number) => {
    set(
      (state) => ({
        tasks: state.tasks.map((task) =>
          task.id === id
            ? {
                ...task,
                completedTimeMinutes: task.completedTimeMinutes + minutes,
              }
            : task
        ),
      }),
      false,
      "task-add-time"
    );
  },

  reorderTasks: (tasks: ITask[]) => {
    const reorderedTasks = tasks.map((task, index) => ({
      ...task,
      order: index,
    }));

    set({ tasks: reorderedTasks }, false, "task-reorder");
  },

  setState: (type: keyof ITaskState, value: any) => {
    set({ [type]: value }, false, `task-set-state-${type}`);
  },

  resetState: (type: keyof ITaskState, value?: any) => {
    set(
      {
        [type]: initialState[type as keyof ITaskState] || value || undefined,
      },
      false,
      `task-reset-state-${type}`
    );
  },
});

const useTaskStore = create<ITaskStore>()(
  devtools(
    persist(taskStoreSlice, {
      name: "task-store",
      partialize: (state) => ({
        tasks: state.tasks,
        activeTaskId: state.activeTaskId,
      }),
    }),
    {
      name: "task-store",
      enabled: import.meta.env.VITE_ENVIRONMENT === "local",
    }
  )
);

export default useTaskStore;
