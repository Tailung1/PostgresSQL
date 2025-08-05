import express from "express";
const userRouter = express.Router();
import {
  getUsers,
  createUser,
  updateUserInfo,
  deleteUser,
  getUser,
  signup,
  signin,
  forgotPassword,
} from "../controllers/userController.js";

userRouter.route("/").get(getUsers).post(createUser);
userRouter.route("/:id").get(getUser);
userRouter.route("/signin").post(signin);
userRouter.route("/:id").put(updateUserInfo).delete(deleteUser);
userRouter.route("/signup").post(signup);
userRouter.route("/forgot-password").post(forgotPassword);

export default userRouter;
