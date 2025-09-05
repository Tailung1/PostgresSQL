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
import { uploadImage } from "../middleware/uploadFile.js";

userRouter.route("/").get(getUsers).post(createUser);
userRouter
  .route("/:id")
  .get(getUser)
  .put(updateUserInfo)
  .delete(deleteUser);
userRouter.route("/signin").post(signin);


userRouter.post(
  "/uploadProfilePicture/:id",
  uploadImage.single("profilePicture"),
  uploadProfilePicture
);

userRouter.route("/signup").post(signup);
userRouter.route("/forgot-password").post(forgotPassword);
userRouter.route("/reset-password").post(resetPassword);

export default userRouter;
