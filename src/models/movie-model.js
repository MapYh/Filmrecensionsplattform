const mongoose = require("mongoose");
const { Schema } = mongoose;

const Movie = new Schema({
  title: String, // String is shorthand for {type: String}
  director: String,
  releaseYear: Number,
  genre: String,
});

module.exports = mongoose.model("Movie", Movie);
