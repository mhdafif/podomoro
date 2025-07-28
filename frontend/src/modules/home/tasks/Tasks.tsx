import { DragDropContext, Droppable } from "@hello-pangea/dnd";
import { CheckCircle } from "lucide-react";

import TaskCard from "./TaskCard";
import TaskDelete from "./TaskDelete";
import TaskForm from "./TaskForm";
import useTask from "./useTask";

import { Card } from "@/components/ui/card";

const Tasks = () => {
  /*======================== Hooks ======================== */

  const {
    tasks,
    showDeleteDialog,
    handleDeleteTask,
    confirmDeleteTask,
    cancelDeleteTask,
    handleSetActiveTask,
    getTaskToDeleteTitle,
    onDragEnd,
  } = useTask();

  /*======================== Return ======================== */

  return (
    <div className="space-y-4">
      {/* Add Task Section */}
      <TaskForm />

      {/* Tasks List */}
      {tasks.length === 0 ? (
        <Card className="border-gray-600 bg-[#28303F] p-8 text-center text-gray-400">
          <div className="space-y-2">
            <CheckCircle className="mx-auto h-12 w-12 opacity-50" />
            <h3 className="text-lg font-medium">No tasks yet</h3>
            <p className="text-sm">Create your first task to get started!</p>
          </div>
        </Card>
      ) : (
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="tasks">
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="max-h-72 overflow-auto scroll-smooth"
              >
                {tasks.map((task, index) => (
                  <TaskCard
                    key={task.id}
                    {...{ task, index, handleSetActiveTask, handleDeleteTask }}
                  />
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      )}

      {/* Delete Confirmation Dialog */}
      <TaskDelete
        {...{
          showDeleteDialog,
          cancelDeleteTask,
          confirmDeleteTask,
          getTaskToDeleteTitle,
        }}
      />
    </div>
  );
};

export default Tasks;
