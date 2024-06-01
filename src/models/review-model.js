const mongoose = require("mongoose");
const { Schema } = mongoose;

const Review = new Schema({
  movieId: { type: mongoose.Types.ObjectId, ref: "Movie", required: true },
  userId: { type: mongoose.Types.ObjectId, ref: "User", required: true },
  rating: {
    type: Number,
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
  createdAt: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Review", Review);
