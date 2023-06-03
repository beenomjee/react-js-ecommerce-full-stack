import jwt from "jsonwebtoken";
import { User } from "../db/index.js";
const adminMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Missing authorization token!" });
    }

    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
    const user = await User.findById(decodedToken);
    if (!user) {
      return res.status(401).json({ message: "Invalid token!" });
    } else if (!user.isAdmin) {
      return res
        .status(403)
        .json({ message: "You don't have access to this route!" });
    }

    req.user = user;
    next();
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error!" });
  }
};

export default adminMiddleware;
