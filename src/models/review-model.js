const mongoose = require("mongoose");
const { Schema } = mongoose;

const reviewSchema = new Schema({
  movieId: { type: mongoose.Types.ObjectId, ref: "Movie" },
  userId: { type: mongoose.Types.ObjectId, ref: "User" },
  rating: Number,
  comment: String,
  createdAt: String,
});

module.exports = mongoose.model("Review", reviewSchema);
