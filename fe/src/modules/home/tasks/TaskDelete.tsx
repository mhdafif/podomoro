import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface DeleteTaskProps {
  showDeleteDialog: boolean;
  cancelDeleteTask: () => void;
  confirmDeleteTask: () => void;
  getTaskToDeleteTitle: () => string;
}

const TaskDelete = (props: DeleteTaskProps) => {
  /*======================== Props ======================== */

  const {
    showDeleteDialog,
    cancelDeleteTask,
    confirmDeleteTask,
    getTaskToDeleteTitle,
  } = props;

  /*======================== Return ======================== */
  return (
    <Dialog open={showDeleteDialog} onOpenChange={cancelDeleteTask}>
      <DialogContent className="border-gray-600 bg-[#1e1e1e] text-white">
        <DialogHeader>
          <DialogTitle>Delete Task</DialogTitle>
          <DialogDescription className="text-gray-400">
            Are you sure you want to delete "{getTaskToDeleteTitle()}"? This
            action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            onClick={cancelDeleteTask}
            variant="outline"
            className="border-gray-600 bg-black text-white hover:bg-gray-700"
          >
            Cancel
          </Button>
          <Button
            onClick={confirmDeleteTask}
            className="bg-red-600 text-white hover:bg-red-700"
          >
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default TaskDelete;
