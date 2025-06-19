import { useState} from "react";

import TodoHeader from "../To_Do/TodoHeader";
import TodoList from "../To_Do/TodoList";

const TodoApp = () => {
  const [todos, setTodos] = useState([
    {
      id: 1,
      title: "Complete the React project documentation",
      completed: false
    },
    {
      id: 2,
      title: "Review pull requests",
      completed: true
    },
    {
      id: 3,
      title: "Plan team meeting agenda for next week and prepare presentation slides",
      completed: false
    },
    {
      id: 4,
      title: "Update dependencies",
      completed: false
    },
    {
      id: 5,
      title: "Fix responsive design issues on mobile devices",
      completed: false
    }
  ]);
  const [newTodo, setNewTodo] = useState('');

  // Placeholder functions for actions
  const handleAddTodo = () => {
    const todo = {
      id: Date.now(),
      title: newTodo,
      completed: false
    };
    setTodos([todo, ...todos]);
    setNewTodo('');
  };

  const handleToggle = (id) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const handleView = (id) => {
    console.log('View todo:', id);
  };

  const handleUpdate = (id) => {
    console.log('Update todo:', id);
  };

  const handleDelete = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const completedCount = todos.filter(todo => todo.completed).length;
  const totalCount = todos.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-2 sm:p-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
          <div className="p-3 sm:p-6 md:p-8 space-y-4 sm:space-y-6">
            <TodoHeader 
              newTodo={newTodo}
              setNewTodo={setNewTodo}
              onAddTodo={handleAddTodo}
            />

            {/* Stats */}
            {totalCount > 0 && (
              <div className="flex justify-center">
                <div className="flex items-center gap-3 sm:gap-6 text-xs sm:text-sm text-gray-600 bg-gray-50 px-3 sm:px-4 py-2 rounded-full">
                  <span>Total: {totalCount}</span>
                  <span className="text-green-600">Completed: {completedCount}</span>
                  <span className="text-blue-600">Pending: {totalCount - completedCount}</span>
                </div>
              </div>
            )}

            <TodoList
              todos={todos}
              onToggle={handleToggle}
              onView={handleView}
              onUpdate={handleUpdate}
              onDelete={handleDelete}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoApp;