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
  resetPassword,
  uploadProfilePicture,
} from "../controllers/userController.js";

userRouter.route("/").get(getUsers).post(createUser);
userRouter.route("/:id").get(getUser);
userRouter.route("/signin").post(signin);
userRouter.route("/:id").put(updateUserInfo).delete(deleteUser);
userRouter.route("/uploadProfilePicture/:id").post(updateUserInfo)

userRouter.route("/signup").post(signup);
userRouter.route("/forgot-password").post(forgotPassword);
userRouter.route("/reset-password").post(resetPassword);



export default userRouter;
