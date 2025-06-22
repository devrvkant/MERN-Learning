import { useState } from "react";

import { Eye, Trash2, Check, Circle, Edit } from "lucide-react";
import { toast } from "sonner";

import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import {
  useDeleteTodoMutation,
  useUpdateTodoStatusMutation,
  useUpdateTodoTitleMutation,
} from "../../redux/rtkQuery/apiSlice";
import { UpdateTodoDialog } from "./UpdateTodoDialog";
import { cn } from "../../lib/utils";

const TodoItem = ({ todo }) => {
  const [open, setOpen] = useState(false);
  const [deleteTodo] = useDeleteTodoMutation();
  const [updateTodoTitle] = useUpdateTodoTitleMutation();
  const [updateTodoStatus] = useUpdateTodoStatusMutation();

  const handleDeleteTodo = async (id) => {
    try {
      await deleteTodo(id).unwrap();
    } catch (err) {
      console.error(err);
      toast.error(err);
    }
  };
  const handleUpdateTodoTitle = async (title) => {
    try {
      await updateTodoTitle({ updatingTitle: title, id: todo._id }).unwrap();
    } catch (err) {
      console.error(err);
      toast.error(err);
    }
  };
  const handleUpdateTodoStatus = async (id) => {
    try {
      const updatingStatus = !todo.completed;
      await updateTodoStatus({ id, updatingStatus }).unwrap();
    } catch (err) {
      console.error(err);
      toast.error(err);
    }
  };
  return (
    <Card
      className={cn(
        "group hover:shadow-md transition-all duration-200 border border-gray-200 hover:border-blue-300",
        todo.isPending && "opacity-50 pointer-events-none animate-pulse"
      )}
    >
      <CardContent className="p-2 sm:p-3 md:p-4">
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Read/Mark Button */}
          <Button
            variant="ghost"
            size="sm"
            className="p-1.5 sm:p-2 hover:bg-green-100 hover:text-green-600 transition-colors flex-shrink-0"
            onClick={() => handleUpdateTodoStatus(todo._id)}
          >
            {todo.completed ? (
              <Check className="h-4 w-4 sm:h-5 sm:w-5 text-green-600" />
            ) : (
              <Circle className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
            )}
          </Button>

          {/* Todo Title with line clamp */}
          <div className="flex-1 min-w-0 flex items-center">
            <p
              className={`text-sm sm:text-base truncate ${
                todo.completed ? "text-gray-500 line-through" : "text-gray-900"
              }`}
            >
              {todo.title}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-0.5 sm:gap-1 opacity-0 group-hover:opacity-100 transition-opacity md:opacity-100 flex-shrink-0">
            <Button
              variant="ghost"
              size="sm"
              className="p-1.5 sm:p-2 hover:bg-blue-100 hover:text-blue-600 transition-colors"
              onClick={() => onView(todo.id)}
            >
              <Eye className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="p-1.5 sm:p-2 hover:bg-yellow-100 hover:text-yellow-600 transition-colors"
              onClick={() => setOpen(true)}
            >
              <Edit className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            </Button>
            {/* updateTodoDialog */}
            <UpdateTodoDialog
              open={open}
              onOpenChange={setOpen}
              initialTitle={todo.title}
              onUpdate={handleUpdateTodoTitle}
              todoID={todo._id}
            />
            <Button
              variant="ghost"
              size="sm"
              className="p-1.5 sm:p-2 hover:bg-red-100 hover:text-red-600 transition-colors"
              onClick={() => handleDeleteTodo(todo._id)}
            >
              <Trash2 className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TodoItem;
