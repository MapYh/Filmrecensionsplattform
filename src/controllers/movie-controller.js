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
  if (!title || !director || !releaseYear || !genre) {
    return res.status(400).json({
      error: "Title, director, release year or genre are missing or incorrect",
    });
  }
  const duplicate = await Movie.findOne({ title: title });
  if (duplicate) {
    return res
      .status(409)
      .json({ Message: "A movie with that title already exists." });
  }
  try {
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

async function getAllMoviesInDb(req, res) {
  try {
    const result = await Movie.find();
    if (result) {
      console.log(result);
      res.status(201).json({ success: true, Message: result });
    } else {
      res
        .status(500)
        .json({ success: false, Message: "Could not find movies." });
    }
  } catch (error) {
    res.status(500).json({ Message: "Internal server error." });
  }
}

async function getMovieById(req, res) {
  try {
    const result = await Movie.findById(req.params.id);
    if (result) {
      console.log(result);
      res.status(201).json({ success: true, Message: result });
    } else {
      res.status(500).json({
        success: false,
        Message: `Could not find movie with id: ${id}.`,
      });
    }
  } catch (error) {
    res.status(500).json({ Message: "Internal server error." });
  }
}

async function updateAMovieById(req, res) {
  const { title, genre, releaseYear, director } = req.body;

  if (!title || !director || !releaseYear || !genre) {
    return res.status(400).json({
      error: "Title, director, release year or genre are missing or incorrect",
    });
  }

  try {
    const result = await Movie.findByIdAndUpdate(req.params.id, {
      title: title,
      director: director,
      releaseYear: releaseYear,
      genre: genre,
    });
    if (result) {
      console.log(result);
      res.status(201).json({ success: true, Message: result });
    } else {
      res.status(500).json({
        success: false,
        Message: `Could not update movie with title: ${title}.`,
      });
    }
  } catch (error) {
    res.status(500).json({ Message: "Internal server error." });
  }
}

async function deleteAMovieById(req, res) {
  try {
    const result = await Movie.findByIdAndDelete(req.params.id);
    if (result) {
      console.log(result);
      res.status(201).json({
        success: true,
        Message: `Deleted a movie with the id: ${req.params.id}`,
      });
    } else {
      res.status(500).json({
        success: false,
        Message: `Could not delete movie with id: ${req.params.id}.`,
      });
    }
  } catch (error) {
    res.status(500).json({ Message: "Internal server error." });
  }
}

module.exports = {
  addAMovieToDb,
  getAllMoviesInDb,
  getMovieById,
  updateAMovieById,
  deleteAMovieById,
};
