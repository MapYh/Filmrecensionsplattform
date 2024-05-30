const reviews = require("../models/review-model");
const movies = require("../models/movie-model");
const users = require("../models/user-model");

async function addAReviewToAMovie(req, res) {
  const { movieId, userId, rating, comment, createdAt } = req.body;

  const movieToReview = await movies.findById(movieId);
  if (!movieToReview) {
    return res.status(400).json({
      error: `could not find a movie with id: ${movieId}`,
    });
  }
  const user = await users.findById(userId);
  if (!user) {
    return res.status(400).json({
      error: `could not find a user with id: ${userId}`,
    });
  }
  try {
    const result = await reviews.create({
      movieId: movieId,
      userId: userId,
      rating: rating,
      comment: comment,
      createdAt: createdAt,
    });
    if (result) {
      res.status(200).json({
        status: "success",
        message: "Review posted!",
        movie: result,
      });
    } else {
      res.status(401).send("Review not posted.");
    }
  } catch (error) {
    res.status(500).json({ message: "Error adding a review." });
  }
}

module.exports = { addAReviewToAMovie };
