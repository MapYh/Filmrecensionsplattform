const mongoose = require("mongoose");
const { Schema } = mongoose;
const Users = require("../models/user-model");

const userSchema = new Schema({
  username: String, // String is shorthand for {type: String}
  email: String,
  password: String,
  role: String,
});

module.exports = mongoose.model("User", userSchema);
