import { useState } from "react";
import { useSelector } from "react-redux";

import { Plus, User, LogOut, CheckSquare } from "lucide-react";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useAddTodoMutation } from "../../redux/rtkQuery/todosApi";
import { useLogOutMutation } from "../../redux/rtkQuery/authApi";

const TodoHeader = () => {
  const [addNewTodo, { isLoading }] = useAddTodoMutation();
  const [logOut, { isLoading: isLoggingOut }] = useLogOutMutation();
  const user = useSelector((state) => state.auth.user);
  let [newTodo, setNewTodo] = useState("");

  const handleAddTodo = async () => {
    try {
      newTodo = newTodo.trim();
      await addNewTodo({
        title: newTodo,
      }).unwrap();

      setNewTodo("");
    } catch (err) {
      console.error(err);
      // show the error message to user.
      toast.error(err);
    }
  };

  const handleLogout = async () => {
    try {
      await logOut().unwrap();
    } catch (err) {
      console.error("Logout error : ", err);
    }
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header with App Icon and User Avatar */}
      <div className="flex items-center justify-between">
        {/* Left side - App Icon and Title */}
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg shadow-lg">
            <CheckSquare className="h-6 w-6 text-white" />
          </div>
          <div className="text-left">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">
              Todo
            </h1>
            <p className="text-gray-600 text-xs sm:text-sm hidden sm:block">
              Stay organized
            </p>
          </div>
        </div>

        {/* Right side - User Avatar */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="relative h-10 w-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transition-all duration-200"
            >
              <User className="h-5 w-5 text-white" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-56 bg-white/95 backdrop-blur-md border border-white/20 shadow-2xl rounded-xl"
            align="end"
            forceMount
          >
            <div className="flex flex-col space-y-1 p-3 bg-gradient-to-r from-blue-50/70 to-purple-50/70 rounded-t-xl">
              <p className="text-sm font-semibold text-slate-800">
                {user?.name || "User"}
              </p>
              <p className="text-xs text-slate-600">
                {user?.email || "user@example.com"}
              </p>
            </div>
            <DropdownMenuSeparator className="bg-gradient-to-r from-blue-200/60 to-purple-200/60 h-px" />
            <DropdownMenuItem
              onClick={handleLogout}
              disabled={isLoggingOut}
              className="text-red-600 hover:text-red-700 hover:bg-red-50/80 focus:bg-red-50/80 cursor-pointer m-2 rounded-lg transition-all duration-200 disabled:opacity-50"
            >
              <LogOut className="mr-2 h-4 w-4" />
              <span className="font-medium">
                Logout
              </span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Add Todo Form */}
      <Card className="shadow-lg border border-gray-200">
        <CardContent className="p-3 sm:p-4 md:p-6">
          <div className="flex flex-col sm:flex-row gap-3 items-center">
            <div className="flex-1 w-full">
              <Input
                type="text"
                placeholder="Add a new todo..."
                disabled={isLoading}
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleAddTodo()}
                className="text-sm sm:text-base border-2 border-gray-200 focus:border-blue-500 transition-colors h-10 sm:h-11"
              />
            </div>
            <Button
              onClick={handleAddTodo}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 sm:px-6 py-2 transition-colors shadow-md hover:shadow-lg w-full sm:w-auto h-10 sm:h-11 flex items-center justify-center"
              disabled={!newTodo.trim() || isLoading}
            >
              <Plus className="h-4 w-4 mr-2" />
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                "Add Todo"
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
export default TodoHeader;
