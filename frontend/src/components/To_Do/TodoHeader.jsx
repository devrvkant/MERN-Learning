import { useState } from "react";

import { Plus } from "lucide-react";

import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";

const TodoHeader = () => {
  const [newTodo,setNewTodo] = useState("")
  
  const handleAddTodo = async () =>{
    
  }
  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
          Todo List
        </h1>
        <p className="text-gray-600 text-sm md:text-base">
          Stay organized and get things done
        </p>
      </div>

      {/* Add Todo Form */}
      <Card className="shadow-lg border border-gray-200">
        <CardContent className="p-3 sm:p-4 md:p-6">
          <div className="flex flex-col sm:flex-row gap-3 items-center">
            <div className="flex-1 w-full">
              <Input
                type="text"
                placeholder="Add a new todo..."
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && newTodo.trim() && handleAddTodo()}
                className="text-sm sm:text-base border-2 border-gray-200 focus:border-blue-500 transition-colors h-10 sm:h-11"
              />
            </div>
            <Button
              onClick={handleAddTodo}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 sm:px-6 py-2 transition-colors shadow-md hover:shadow-lg w-full sm:w-auto h-10 sm:h-11 flex items-center justify-center"
              disabled={!newTodo.trim()}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Todo
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
export default TodoHeader