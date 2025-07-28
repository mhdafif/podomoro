export interface ITask {
  id: string;
  title: string;
  completedTimeMinutes: number; // Total time in minutes
  isActive: boolean;
  createdAt: Date;
  order: number;
}

export interface ITaskState {
  tasks: ITask[];
  activeTaskId: string | null;
}

export interface ITaskStore extends ITaskState {
  addTask(title: string): void;
  deleteTask(id: string): void;
  setActiveTask(id: string | null): void;
  incrementTaskCycles(id: string): void;
  addTaskTime(id: string, minutes: number): void;
  reorderTasks(tasks: ITask[]): void;
  setState(type: keyof ITaskState, value: any): void;
  resetState(type: keyof ITaskState, value?: any): void;
}
