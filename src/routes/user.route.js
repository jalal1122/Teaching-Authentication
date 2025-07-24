import express from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
} from "../controller/user.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);

userRouter.post("/login", loginUser);

userRouter.get("/logout", authMiddleware, logoutUser);

export default userRouter;
