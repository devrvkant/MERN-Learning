import TodoHeader from "../To_Do/TodoHeader";
import TodoList from "../To_Do/TodoList";
import { useGetTodosQuery } from "../../redux/rtkQuery/apiSlice";

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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-2 sm:p-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
          <div className="p-3 sm:p-6 md:p-8 space-y-4 sm:space-y-6">
            <TodoHeader />

            {/* Stats */}
            {totalCount > 0 && (
              <div className="flex justify-center">
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
  );
};

export default TodoApp;
