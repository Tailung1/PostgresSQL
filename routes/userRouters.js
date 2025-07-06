import express from "express";
const userRouter = express.Router();
import {
  getUsers,
  createUser,
  updateUserInfo,
  deleteUser,
  getUser,
} from "../controllers/userController.js";

userRouter.route("/").get(getUsers).post(createUser);
userRouter.route("/:id").put(updateUserInfo).delete(deleteUser);
userRouter.route("/:id").get(getUser);

export default userRouter;
