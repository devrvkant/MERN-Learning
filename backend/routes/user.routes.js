import { Router } from "express";

import {
  getAllUsers,
  signUp,
  logIn,
  logOut,
  verifyEmail,
  forgotPassword,
  resetPassword
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

// for requesting the passwordReset and recieve the link through email :- forgotPassword
userRouter.post("/forgot-password", forgotPassword)

// for settingUp new password and get the success email :- resetPassword
userRouter.patch("/reset-password/:token", resetPassword)

export default userRouter;
