const Movie = require("../models/movie-model");

async function addAMovieToDb(req, res) {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["title", "director", "releaseYear", "genre"];
  const isValid = updates.every((update) => allowedUpdates.includes(update));
  if (!isValid) {
    res.status(400).json({ message: "Invalid request fields" });
    return;
  }

  const { title, director, releaseYear, genre } = req.body;

  const duplicate = await Movie.findOne({ title: title });
  if (duplicate) {
    return res
      .status(409)
      .json({ Message: "A movie with that title already exists." });
  }
  try {
    console.log("Here");
    const result = await Movie.create({
      title: title,
      director: director,
      releaseYear: releaseYear,
      genre: genre,
    });
    if (result) {
      console.log(result);
      res.status(201).json({ success: true, Message: "New movie added." });
    } else {
      res.status(500).json({ success: false, Message: "No new movie added." });
    }
  } catch (error) {
    res.status(500).json({ Message: "Internal server error." });
  }
}

module.exports = { addAMovieToDb };
