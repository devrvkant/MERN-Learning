import { Circle } from "lucide-react";

import TodoItem from "./TodoItem";

const TodoList = ({ todos, isError, error, isLoading }) => {
  if (isLoading)
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-500">Loading todos...</p>
        </div>
      </div>
    );
  if (isError)
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center py-12">
          <div className="mx-auto w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mb-4">
            <Circle className="h-12 w-12 text-red-400" />
          </div>
          <h3 className="text-lg font-medium text-red-900 mb-2">
            Error loading todos
          </h3>
          <p className="text-red-600 text-sm">
            {error || "Something went wrong"}
          </p>
        </div>
      </div>
    );

  return (
    <div className="h-full overflow-y-auto pr-2">
      {todos.length === 0 ? (
        <div className="h-full flex items-center justify-center">
          <div className="text-center">
            <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <Circle className="h-12 w-12 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No todos yet
            </h3>
            <p className="text-gray-500 text-sm">
              Create your first todo to get started!
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          {todos.map((todo) => (
            <TodoItem key={todo._id} todo={todo} />
          ))}
        </div>
      )}
    </div>
  );
};
export default TodoList;
