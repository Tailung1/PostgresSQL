const userRouter = express.Router();
import { getUser,createUser } from "../controllers/productController";


userRouter.route("/").get(getUser).post(createUser);

export default userRouter