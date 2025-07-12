import dotenv from "dotenv";
import jwt from "jsonwebtoken";
dotenv.config();

const authenticated = (req, res, next) => {
  const session = req.headers.authorization;

  if (!session || !session.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized access - no token" });
  }

  const token = session.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_TOKEN);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ message: "Invalid or expired token" });
  }
};

export default authenticated;