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
} from "../controllers/userController.js";

userRouter.route("/").get(getUsers).post(createUser);
userRouter.route("/:id").get(getUser);
userRouter.route("/signin").get(signin);
userRouter.route("/:id").put(updateUserInfo).delete(deleteUser);
userRouter.route("/signup").post(signup);

export default userRouter;
