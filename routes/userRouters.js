import express from "express";
const userRouter = express.Router();
import {
  getUser,
  createUser,
  updateUserInfo,
  deleteUser,
} from "../controllers/userController.js";

userRouter.route("/").get(getUser).post(createUser);
userRouter.route("/:id").put(updateUserInfo).delete(deleteUser);

export default userRouter;
