import { cn } from "@/lib/utils";
import { Draggable } from "@hello-pangea/dnd";
import { CheckCircle, GripVertical, Pause, Play, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

import type { ITask } from "@/store/task/ITaskStore";
import useTimerStore from "@/store/timer/timerStore";

import { formatTimeFromMinutes } from "@/utils/timeFormatter";

interface TaskCardProps {
  task: ITask;
  index: number;
  handleSetActiveTask: (taskId: string) => void;
  handleDeleteTask: (taskId: string) => void;
}
const TaskCard = (props: TaskCardProps) => {
  /*======================== Props ======================== */

  const { task, index, handleSetActiveTask, handleDeleteTask } = props;

  /*======================== Store ======================== */

  const timerState = useTimerStore((state) => state.timerState);

  /*======================== Handlers ======================== */
  return (
    <Draggable key={task.id} draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          className={`not-last:mb-3 ${snapshot.isDragging ? "opacity-60" : ""}`}
        >
          <Card className="bg-dark-bg relative border-white/10 py-4 pr-24 pl-4 text-white">
            <div className="flex items-center">
              {/* Left side - Drag handle and task info */}
              <div className="flex flex-1 items-center gap-3">
                <div
                  {...provided.dragHandleProps}
                  className="cursor-grab text-gray-400 hover:text-white active:cursor-grabbing"
                >
                  <GripVertical className="h-4 w-4" />
                </div>

                <div className="flex-1">
                  <h3 className="line-clamp-2 font-medium text-white">
                    {task.title}
                  </h3>
                  <div className="mt-1 flex items-center gap-2">
                    <CheckCircle className="text-blue-tertiary h-3 w-3" />
                    <div className="text-xs text-gray-400">
                      <span className="text-blue-tertiary mr-1">
                        {formatTimeFromMinutes(task.completedTimeMinutes)}{" "}
                      </span>
                      completed
                    </div>
                  </div>
                </div>
              </div>

              {/* Right side - Controls and badge */}
              <div className="absolute top-0 right-0 flex h-full items-center">
                {/* Play/Pause button */}
                <Button
                  onClick={() => handleSetActiveTask(task.id)}
                  variant="outline"
                  size="sm"
                  className={cn(
                    "h-full rounded-none border-none",
                    task.isActive
                      ? "bg-blue-tertiary text-white"
                      : "text-blue-tertiary bg-white/10"
                  )}
                  disabled={timerState === "running"}
                >
                  {task.isActive ? (
                    <Pause className="mx-0.5 h-3 w-3" />
                  ) : (
                    <Play className="mx-0.5 h-3 w-3" />
                  )}
                </Button>

                {/* Delete button */}
                <Button
                  onClick={() => handleDeleteTask(task.id)}
                  variant="outline"
                  size="sm"
                  className="bg-dark-bg text-destructive h-full rounded-none border-none"
                  disabled={timerState === "running"}
                >
                  <Trash2 className="mx-0.5 h-3 w-3" />
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}
    </Draggable>
  );
};

export default TaskCard;
