import TodoHeader from "../To_Do/TodoHeader";
import TodoList from "../To_Do/TodoList";
import { useGetTodosQuery } from "../../redux/rtkQuery/todosApi";

const TodoApp = () => {
  const {
    data: todos = [],
    isLoading,
    isError,
    error,
    isSuccess,
  } = useGetTodosQuery();

  const completedCount = todos.filter((todo) => todo.completed).length;
  const totalCount = todos.length;

  return (
    <div className="h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 px-2">
  <div className="max-w-4xl mx-auto h-full">
    <div className="bg-white shadow-xl border border-gray-200 overflow-hidden h-full flex flex-col">
      <div className="p-3 sm:p-6 md:p-8 flex flex-col h-full">
        {/* Fixed Header */}
        <div className="flex-shrink-0">
          <TodoHeader />
        </div>
        
        {/* Fixed Stats */}
        {totalCount > 0 && (
          <div className="flex-shrink-0 flex justify-center mt-4 sm:mt-6">
            <div className="flex items-center gap-3 sm:gap-6 text-xs sm:text-sm text-gray-600 bg-gray-50 px-3 sm:px-4 py-2 rounded-full">
              <span>Total: {totalCount}</span>
              <span className="text-green-600">
                Completed: {completedCount}
              </span>
              <span className="text-blue-600">
                Pending: {totalCount - completedCount}
              </span>
            </div>
          </div>
        )}
        
        {/* Scrollable TodoList - takes remaining space */}
        <div className="flex-1 mt-4 sm:mt-6 min-h-0">
          <TodoList
            todos={todos}
            isLoading={isLoading}
            isError={isError}
            error={error}
            isSuccess={isSuccess}
          />
        </div>
      </div>
    </div>
  </div>
</div>
  );
};

export default TodoApp;
