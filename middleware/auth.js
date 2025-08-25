import jwt from "jsonwebtoken";
import { JwtErrorHndler } from "../utils/errorhandler.js";

export const auth = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Unauthorized1" });
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      next(JwtErrorHndler());
      // return res.status(401).json({ message: "Unauthorized1" });
    }
    req.user = decoded;
    next();
  });
};

export const isAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res
      .status(401)
      .send({ message: "Only admin can acces this route" });
  }
  next();
};
