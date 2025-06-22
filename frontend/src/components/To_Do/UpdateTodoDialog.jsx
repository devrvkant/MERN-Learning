import { useState, useEffect } from "react";

import { Loader2 } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export function UpdateTodoDialog({
  open,
  onOpenChange,
  initialTitle,
  onUpdate,
}) {
  const [title, setTitle] = useState(initialTitle);

  useEffect(() => {
    setTitle(initialTitle);
  }, [open]);

  const handleUpdate = () => {
    const formatedTitle = title.trim();
    // prevent to setting empty Todo title
    if (!formatedTitle) {
      toast.error("Todo Title can't be empty, Skipping update!");
      return;
    }
    // prevent update if no changes in the title
    if (formatedTitle === initialTitle.trim()) {
      toast.error("No changes detected, Skipping update!");
      return;
    }
    onUpdate(formatedTitle);
    onOpenChange(false);
  };

  return (
    <Dialog className="mx-2" open={open} onOpenChange={onOpenChange}>
      <DialogContent className="rounded-xl border border-gray-200 bg-white shadow-lg max-w-md w-full">
        <DialogHeader>
          <DialogTitle>Edit Todo</DialogTitle>
          <DialogDescription>
            Update your task title and click save to confirm.
          </DialogDescription>
        </DialogHeader>
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mt-2"
          placeholder="Enter new title"
        />
        <DialogFooter className="mt-4">
          <Button
            className={"bg-gray-100 text-gray-700 hover:bg-gray-200"}
            variant="secondary"
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
          <Button
            onClick={handleUpdate}
            className={"bg-emerald-100 text-emerald-700 hover:bg-emerald-200"}
          >
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
