import { Router } from "express";

import { loginUser, registerUser } from "../controllers/user.controller";

const userRouter = Router()

// register a new user
Router.post("/register",registerUser)

// login an existing user
Router.post("/login",loginUser)

export default userRouter;