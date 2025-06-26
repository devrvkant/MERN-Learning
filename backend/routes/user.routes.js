import { Router } from "express";

import {
  getAllUsers,
  signUp,
  logIn,
  logOut,
  verifyEmail
} from "../controllers/user.controller.js";

const userRouter = Router();
userRouter.get("/users", getAllUsers);

// signup(register) a new user
userRouter.post("/signup", signUp);

// login an existing user
userRouter.post("/login", logIn);

// logout an existing user
userRouter.post("/logout", logOut);

// for verifying emails during accounts creation
userRouter.post("/verify-email", verifyEmail)

export default userRouter;
