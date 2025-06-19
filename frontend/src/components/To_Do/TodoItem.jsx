import { Eye, Trash2, Check, Circle, Edit } from "lucide-react";

import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";

const TodoItem = ({ todo, onToggle, onView, onUpdate, onDelete }) => {
  return (
    <Card className="group hover:shadow-md transition-all duration-200 border border-gray-200 hover:border-blue-300">
      <CardContent className="p-2 sm:p-3 md:p-4">
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Read/Mark Button */}
          <Button
            variant="ghost"
            size="sm"
            className="p-1.5 sm:p-2 hover:bg-green-100 hover:text-green-600 transition-colors flex-shrink-0"
            onClick={() => onToggle(todo.id)}
          >
            {todo.completed ? (
              <Check className="h-4 w-4 sm:h-5 sm:w-5 text-green-600" />
            ) : (
              <Circle className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
            )}
          </Button>

          {/* Todo Title with line clamp */}
          <div className="flex-1 min-w-0 flex items-center">
            <p className={`text-sm sm:text-base line-clamp-2 ${
              todo.completed 
                ? 'text-gray-500 line-through' 
                : 'text-gray-900'
            }`}>
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
              onClick={() => onUpdate(todo.id)}
            >
              <Edit className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="p-1.5 sm:p-2 hover:bg-red-100 hover:text-red-600 transition-colors"
              onClick={() => onDelete(todo.id)}
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