import express from "express";
const userRouter = express.Router();
import {
  getUsers,
  createUser,
  updateUserInfo,
  deleteUser,
  getUser,
  signup,
} from "../controllers/userController.js";

userRouter.route("/").get(getUsers).post(createUser);
userRouter.route("/:id").put(updateUserInfo).delete(deleteUser);
userRouter.route("/:id").get(getUser);
userRouter.route("/signup").post(signup);

export default userRouter;
