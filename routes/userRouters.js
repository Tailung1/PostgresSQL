import express from "express"
const userRouter = express.Router();
import { getUser,createUser, updateUserInfo } from "../controllers/userController.js";


userRouter.route("/").get(getUser).post(createUser);
userRouter.route("/:id").put(updateUserInfo)

export default userRouter