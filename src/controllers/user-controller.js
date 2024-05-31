const { comparePasswords } = require("../utils/compare-passwords");
const jwt = require("jsonwebtoken");

const Users = require("../models/user-model");

async function signup(req, res) {
  const { username, password, email, role } = req.body;

  if (!username || !password || !email || !role) {
    return res.status(400).json({
      error: "Username, email, role or password are missing or incorrect",
    });
  }

  try {
    const existingUser = await getAUser(username);

    if (existingUser != null) {
      return res.status(418).json({ error: "Username already exists" });
    }

    await createAccount(username, password, email, role);
    res.status(200).json({
      status: "success",
      message: "Account created successfully",
    });
  } catch (error) {
    console.error("Error creating account", error);
    res.status(500).json({ message: "Error creating account" });
  }
}

async function login(req, res) {
  const { username, password, role } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ error: "Username and password are missing or incorrect" });
  }

  try {
    const user = await getAUser(username);

    if (user == null) {
      return res.status(404).send("User not found");
    }

    const validPassword = comparePasswords(password, user.password);

    if (validPassword && user.role == "admin") {
      const token = jwt.sign(
        { id: user._id, username: user.username, role: "admin" },
        process.env.JWT_SECRET,
        {
          expiresIn: 600,
        }
      );

      res.status(200).json({
        status: "success",
        message: "Admin login successful",
        token,
      });
    } else if (validPassword && user.role == "user") {
      const token = jwt.sign(
        { id: user._id, username: user.username, role: "user" },
        process.env.JWT_SECRET,
        {
          expiresIn: 600,
        }
      );
      res.status(200).json({
        status: "success",
        message: "User login successful",
        token,
      });
    } else {
      res.status(401).send("Wrong password or wrong role");
    }
  } catch (error) {
    console.error("Error checking password", error);
    res.status(500).send("Internal server error");
  }
}

async function getAUser(username) {
  const result = await Users.findOne({ username: username });
  if (result) {
    return result;
  } else {
    return;
  }
}

async function createAccount(user_name, user_password, user_email, user_role) {
  const result = await Users.create({
    username: user_name,
    password: user_password,
    email: user_email,
    role: user_role,
  });
}

module.exports = { signup, login };
