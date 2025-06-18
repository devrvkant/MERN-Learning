import { Router } from "express";

const todoRouter = Router();

// get all todos & create a new one
todoRouter
  .route("/")
  .get((req, res) => res.send("all todos"))
  .post((req, res) => res.send("new todo created"));

// get todo, update todo & delete todo with id
todoRouter
  .route("/:id")
  .get((req, res) => res.send("todo with id"))
  .patch((req, res) => res.send("todo updated with id"))
  .delete((req, res) => res.send("todo deleted with id"));

export default todoRouter;
