import { Router } from "express";

import {
  getAllUsers,
  signUp,
  logIn,
  logOut,
} from "../controllers/user.controller.js";

const userRouter = Router();
userRouter.get("/users", getAllUsers);

// signup(register) a new user
userRouter.post("/signup", ()=> res.send("yes user is registered"));

// login an existing user
userRouter.post("/login", logIn);

// logout an existing user
userRouter.post("/logout", logOut);

export default userRouter;
