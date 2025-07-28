import { Plus } from "lucide-react";

import useTask from "./useTask";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const TaskForm = () => {
  /*======================== Props ======================== */

  const { newTaskTitle, setNewTaskTitle, handleAddTask, handleEnterAddTask } =
    useTask();

  /*======================== Return ======================== */

  return (
    <div className="flex gap-2">
      <Input
        value={newTaskTitle}
        onChange={(e) => setNewTaskTitle(e.target.value)}
        onKeyDown={handleEnterAddTask}
        placeholder="New task title"
        className="flex-1 border-white/10"
      />
      <Button
        onClick={handleAddTask}
        disabled={!newTaskTitle.trim()}
        className="bg-blue-600 text-white hover:bg-blue-700"
      >
        <Plus className="mr-2 h-4 w-4" />
        Task
      </Button>
    </div>
  );
};

export default TaskForm;
