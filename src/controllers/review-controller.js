const reviews = require("../models/review-model");
const movies = require("../models/movie-model");
const users = require("../models/user-model");

async function addAReviewToAMovie(req, res) {
  const { movieId, userId, rating, comment, createdAt } = req.body;
  if (!movieId || !userId || !rating || !comment || !createdAt) {
    return res.status(400).json({
      error:
        "MovieId, userId, rating, comment or creation date are missing or incorrect",
    });
  }
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
      });
    } else {
      res.status(401).send("Review not posted.");
    }
  } catch (error) {
    res.status(500).json({ message: "Error adding a review." });
  }
}

async function getAllReviews(req, res) {
  const allReviews = await reviews.find();
  if (!allReviews) {
    return res.status(400).json({
      error: `could not get the reviews`,
    });
  }

  try {
    if (allReviews) {
      res.status(200).json({
        status: "success",
        message: allReviews,
      });
    } else {
      res.status(401).send(`could not get the reviews`);
    }
  } catch (error) {
    res.status(500).json({ message: "Error getting reviews." });
  }
}

async function getAllReviewForAMovie(req, res) {
  const allReviewsForAMovie = await reviews.find({ movieId: req.params.id });
  console.log(allReviewsForAMovie.length);
  if (!allReviewsForAMovie) {
    return res.status(400).json({
      error: `Could not get the review`,
    });
  }
  if (allReviewsForAMovie.length == 0) {
    return res.status(200).json({
      status: "success",
      Message: `The movie has no reviews.`,
    });
  }

  try {
    if (allReviewsForAMovie) {
      res.status(200).json({
        status: "success",
        message: allReviewsForAMovie,
      });
    } else {
      res.status(401).send(`could not get the reviews`);
    }
  } catch (error) {
    res.status(500).json({ message: "Error getting reviews." });
  }
}

async function getAReview(req, res) {
  const review = await reviews
    .findById(req.params.id)
    .populate("userId")
    .populate("movieId")
    .exec();

  if (!review) {
    return res.status(400).json({
      error: `Could not get the review`,
    });
  }

  try {
    if (review) {
      res.status(200).json({
        status: "success",
        message: review,
      });
    } else {
      res.status(401).send(`could not get the review`);
    }
  } catch (error) {
    res.status(500).json({ message: "Error getting reviews." });
  }
}

async function updateAReview(req, res) {
  const { rating, comment } = req.body;
  if (!rating || !comment) {
    return res.status(400).json({
      error: "Rating or comment date are missing or incorrect",
    });
  }
  const review = await reviews.findById(req.params.id).exec();
  if (!review) {
    return res.status(400).json({
      error: `Could not get the review`,
    });
  }

  try {
    const result = await reviews.findByIdAndUpdate(req.params.id, {
      rating: rating,
      comment: comment,
    });
    if (result) {
      res.status(200).json({
        status: "success",
        message: "Review was updated!",
      });
    } else {
      res.status(401).send(`could not update the review`);
    }
  } catch (error) {
    res.status(500).json({ message: "Error updating the review." });
  }
}

async function deleteAReview(req, res) {
  const result = await reviews.findByIdAndDelete(req.params.id).exec();
  if (!result) {
    return res.status(400).json({
      error: `Could not delete the review.`,
    });
  }

  try {
    if (result) {
      res.status(200).json({
        status: "success",
        message: "Review was deleted successfully.",
      });
    } else {
      res.status(401).send(`could not delete the review`);
    }
  } catch (error) {
    res.status(500).json({ message: "Error deleting the review." });
  }
}

module.exports = {
  addAReviewToAMovie,
  getAllReviews,
  getAllReviewForAMovie,
  getAReview,
  updateAReview,
  deleteAReview,
};
