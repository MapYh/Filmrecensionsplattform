const reviews = require("../models/review-model");
const movies = require("../models/movie-model");
const users = require("../models/user-model");
const jwt = require("jsonwebtoken");

async function addAReviewToAMovie(req, res) {
  const { movieId, userId, rating, comment, createdAt } = req.body;
  if (!movieId || !userId || !rating || !comment || !createdAt) {
    return res.status(400).json({
      Error:
        "MovieId, userId, rating, comment or creation date are missing or incorrect",
    });
  }

  //Checking so that the user is posting under his own id.
  const token = req.header("Authorization");
  const decoded = jwt.verify(
    token.replace("Bearer ", ""),
    process.env.JWT_SECRET
  );
  req.user = decoded;
  if (!(userId == req.user.id)) {
    return res.status(400).json({
      Succcess: false,
      Error: `You can only post reviews with your own id.`,
    });
  }
  //

  const movieToReview = await movies.findById(movieId);
  if (!movieToReview) {
    return res.status(400).json({
      Succcess: false,
      Error: `could not find a movie with id: ${movieId}`,
    });
  }
  const user = await users.findById(userId);
  if (!user) {
    return res.status(400).json({
      Succcess: false,
      Error: `could not find a user with id: ${userId}`,
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
        Succcess: true,
        message: "Review posted!",
      });
    } else {
      res.status(401).json({ Succcess: false, Message: "Review not posted." });
    }
  } catch (error) {
    res
      .status(500)
      .json({ succcess: false, Message: "Error adding a review." });
  }
}

async function getAllReviews(req, res) {
  const allReviews = await reviews
    .find()
    .populate("userId", "username")
    .populate("movieId", "title genre releaseYear director")
    .exec();
  if (!allReviews) {
    return res
      .status(400)
      .json({ Succcess: false, Error: `could not get the reviews` });
  }

  try {
    if (allReviews) {
      res.status(200).json({
        Succcess: true,
        Message: allReviews,
      });
    } else {
      res
        .status(401)
        .json({ Succcess: false, Message: `could not get the reviews` });
    }
  } catch (error) {
    res
      .status(500)
      .json({ Succcess: false, Message: "Error getting reviews." });
  }
}

async function getAllReviewsForAMovie(req, res) {
  const allReviewsForAMovie = await reviews.find({ movieId: req.params.id });

  if (!allReviewsForAMovie) {
    return res
      .status(400)
      .json({ Succcess: false, Error: `Could not get the review` });
  }
  if (allReviewsForAMovie.length == 0) {
    return res.status(200).json({
      Succcess: true,
      Message: `That movie has no reviews.`,
    });
  }

  try {
    if (allReviewsForAMovie) {
      res.status(200).json({
        Succcess: true,
        message: allReviewsForAMovie,
      });
    } else {
      res
        .status(401)
        .json({ Succcess: false, Message: `could not get the reviews` });
    }
  } catch (error) {
    res
      .status(500)
      .json({ Succcess: false, Message: "Error getting reviews." });
  }
}

async function getAReview(req, res) {
  try {
    const review = await reviews
      .findById(req.params.id)
      .populate("userId", "username")
      .populate("movieId", "title genre releaseYear director")
      .exec();

    if (!review) {
      return res
        .status(400)
        .json({ Succcess: false, Error: `Could not get the review` });
    }

    if (review) {
      res.status(200).json({
        Succcess: true,
        message: review,
      });
    } else {
      res
        .status(401)
        .json({ Succcess: false, Message: `could not get the review` });
    }
  } catch (error) {
    res.status(500).json({
      Succcess: false,
      Message: "Error getting reviews. Possibly the id is wrong.",
    });
  }
}

async function updateAReview(req, res) {
  const { rating, comment } = req.body;
  if (rating > 10 || rating <= 0) {
    return res.status(400).json({
      Succcess: false,
      error: "Rating has a max limit of 10 and lower value of 1.",
    });
  }

  const token = req.header("Authorization");
  const decoded = jwt.verify(
    token.replace("Bearer ", ""),
    process.env.JWT_SECRET
  );
  req.user = decoded;

  const reviewUserId = await reviews.findById(req.params.id);
  if (req.user.id == reviewUserId.userId || req.user.role == "admin") {
    if (!rating || !comment) {
      return res.status(400).json({
        Succcess: false,
        error: "Rating or comment date are missing or incorrect",
      });
    }
    const review = await reviews.findById(req.params.id).exec();
    if (!review) {
      return res
        .status(400)
        .json({ Succcess: false, Error: `Could not get the review` });
    }

    try {
      const result = await reviews.findByIdAndUpdate(req.params.id, {
        rating: rating,
        comment: comment,
      });
      if (result) {
        res.status(200).json({
          Succcess: true,
          message: "Review was updated!",
        });
      } else {
        res
          .status(401)
          .json({ Succcess: false, Message: `could not update the review` });
      }
    } catch (error) {
      res
        .status(500)
        .json({ Succcess: false, Message: "Error updating the review." });
    }
  } else {
    res.status(401).json({
      Succcess: false,
      Message: "You can only update your own reviews.",
    });
  }
}

async function deleteAReview(req, res) {
  const token = req.header("Authorization");
  const decoded = jwt.verify(
    token.replace("Bearer ", ""),
    process.env.JWT_SECRET
  );
  req.user = decoded;
  const reviewUserId = await reviews.findById(req.params.id);
  if (req.user.id == reviewUserId.userId || req.user.role == "admin") {
    const result = await reviews.findByIdAndDelete(req.params.id).exec();
    if (!result) {
      return res
        .status(400)
        .json({ Succcess: false, Error: `Could not delete the review.` });
    }

    try {
      if (result) {
        res.status(200).json({
          Succcess: false,
          message: "Review was deleted successfully.",
        });
      } else {
        res
          .status(401)
          .json({ Succcess: false, Message: `could not delete the review` });
      }
    } catch (error) {
      res
        .status(500)
        .json({ Succcess: false, Message: "Error deleting the review." });
    }
  } else {
    res.status(401).json({
      Succcess: false,
      Message: "You can only delete your own reviews.",
    });
  }
}

module.exports = {
  addAReviewToAMovie,
  getAllReviews,
  getAllReviewsForAMovie,
  getAReview,
  updateAReview,
  deleteAReview,
};
