const { comparePasswords } = require("../utils/compare-passwords");
const jwt = require("jsonwebtoken");

const Users = require("../models/user-model");

async function signup(req, res) {
  const { username, password, email, role } = req.body;

  if (!username || !password || !email || !role) {
    return res.status(400).json({
      Succcess: false,
      Error: "Username, email, role or password are missing or incorrect",
    });
  }

  try {
    const existingUser = await getAUser(username);

    if (existingUser != null) {
      return res
        .status(418)
        .json({ Succcess: false, Error: "Username already exists" });
    }
    const existingEmail = await getAUserByEmail(email);
    if (existingEmail != null) {
      return res
        .status(418)
        .json({ Succcess: false, Error: "Email is already registerd" });
    }

    await createAccount(username, password, email, role);
    res.status(200).json({
      Succcess: true,
      message: "Account created successfully",
    });
  } catch (error) {
    console.error("Error creating account", error);
    res
      .status(500)
      .json({ Succcess: false, Message: "Error creating account" });
  }
}

async function login(req, res) {
  const { username, password, role } = req.body;

  if (!username || !password) {
    return res.status(400).json({
      Succcess: false,
      Error: "Username and password are missing or incorrect",
    });
  }

  try {
    const user = await getAUser(username);

    if (user == null) {
      return res
        .status(404)
        .json({ Succcess: false, Message: "User not found" });
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
        Succcess: true,
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
        Succcess: true,
        Message: "User login successful",
        token,
      });
    } else {
      res.status(401).json({ Succcess: false, Message: "Wrong password." });
    }
  } catch (error) {
    console.error("Error checking password", error);
    res.status(500).json({ Succcess: false, Message: "Internal server error" });
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

async function getAUserByEmail(email) {
  const lowerCaseEmail = email.toLowerCase();
  console.log(lowerCaseEmail);
  const result = await Users.findOne({ email: lowerCaseEmail });
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
