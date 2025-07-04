import { Router } from "express";

import {
  getAllUsers,
  signUp,
  logIn,
  logOut,
  verifyEmail,
  forgotPassword,
  resetPassword,
  checkAuth
} from "../controllers/user.controller.js";
import verifyAuthToken from "../middlewares/verifyAuthToken.js";
import upload from "../middlewares/upload.js";

const userRouter = Router();
userRouter.get("/users", getAllUsers);

// for checking that if user is authenticated or not & also works as protetcting our apiRoutes which requires authentication
// verifyToken :- MiddleWare here
userRouter.get("/check-auth", verifyAuthToken, checkAuth)

// for uploading profile picture
userRouter.post("/upload-profile-picture", verifyAuthToken, upload.single("image"), uploadProfilePicture)

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
