import { Circle } from "lucide-react";

import TodoItem from "./TodoItem";

const TodoList = ({ todos, isSuccess, isError, error, isLoading }) => {
  if (isLoading)
    return (
      <div className="flex justify-center text-gray-600 text-sm md:text-base">
        loading...
      </div>
    );
  if (isSuccess)
    return (
      <div className="flex-1 min-h-0">
        <div className="h-full overflow-y-auto pr-2 space-y-3 max-h-[60vh] md:max-h-[70vh]">
          {todos.length === 0 ? (
            <div className="text-center py-12">
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
          ) : (
            todos.map((todo) => <TodoItem key={todo._id} todo={todo} />)
          )}
        </div>
      </div>
    );
  if (isError)
    return (
      <div className="flex justify-center text-gray-600 text-sm md:text-base">
        {error}
      </div>
    );
};
export default TodoList;
