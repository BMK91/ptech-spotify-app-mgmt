const jwt = require("jsonwebtoken");
const { verifyToken } = require("../config/jwt");

const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ error: "Access denied, no token provided" });
  }

  try {
    // const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const decoded = verifyToken(token);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid or expired token" });
  }
};

module.exports = authMiddleware;
