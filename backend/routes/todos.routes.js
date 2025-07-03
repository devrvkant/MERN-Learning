import { Router } from "express";
import {
  createNewTodo,
  deleteTodoById,
  getAllTodoS,
  getTodoByid,
  updateTodoById,
} from "../controllers/todos.controller.js";
import verifyAuthToken from "../middlewares/verifyAuthToken.js";

const todoRouter = Router();

// apply authMiddleware to all routes in todoRouter
todoRouter.use(verifyAuthToken);

// get all todos & create a new one
todoRouter.route("/").get(getAllTodoS).post(createNewTodo);

// get todo, update todo & delete todo with id
todoRouter
  .route("/:id")
  .get(getTodoByid)
  .patch(updateTodoById)
  .delete(deleteTodoById);

export default todoRouter;
