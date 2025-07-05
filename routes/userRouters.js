import express from "express"
const userRouter = express.Router();
import { getUser,createUser } from "../controllers/userController.js";


userRouter.route("/").get(getUser).post(createUser);

export default userRouter