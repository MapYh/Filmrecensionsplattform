const mongoose = require("mongoose");
const { Schema } = mongoose;
const Users = require("../models/user-model");

const User = new Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    lowercase: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("User", User);
