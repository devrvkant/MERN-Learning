import { Router } from "express";

import { getAllUsers, loginUser, registerUser } from "../controllers/user.controller.js";

const userRouter = Router()
userRouter.get("/users",getAllUsers)

// register a new user
userRouter.post("/register",registerUser)

// login an existing user
userRouter.post("/login",loginUser)

export default userRouter;