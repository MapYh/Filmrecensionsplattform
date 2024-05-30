const jwt = require("jsonwebtoken");
require("dotenv").config();

const adminAuth = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied! Token is required" });
  }

  try {
    const decoded = jwt.verify(
      token.replace("Bearer ", ""),
      process.env.JWT_SECRET
    );
    req.user = decoded;

    if (req.user.role == "admin") {
      next();
    } else {
      res.status(401).json({ Error_message: "Invalid role for request." });
    }
  } catch (error) {
    console.error("Invalid token:", error);
    res.status(401).send("Invalid token");
  }
};

const userAuth = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied! Token is required" });
  }

  try {
    const decoded = jwt.verify(
      token.replace("Bearer ", ""),
      process.env.JWT_SECRET
    );
    req.user = decoded;

    if (req.user.role == "user" || req.user.role == "admin") {
      next();
    } else {
      res.status(401).json({ Error_message: "Invalid role for request." });
    }
  } catch (error) {
    console.error("Invalid token:", error);
    res.status(401).send("Invalid token");
  }
};

module.exports = { adminAuth, userAuth };
