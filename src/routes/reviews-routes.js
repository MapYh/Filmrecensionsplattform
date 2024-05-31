const { Router } = require("express");
const {
  addAReviewToAMovie,
  getAllReviews,
  getAllReviewForAMovie,
  getAReview,
} = require("../controllers/review-controller");
const { userAuth } = require("../middleware/role-auth");
const router = Router();

router.post("/reviews", userAuth, addAReviewToAMovie);

router.get("/reviews", userAuth, getAllReviews);

router.get("/reviews/:id", userAuth, getAReview);
router.get("/movies/:id/reviews", userAuth, getAllReviewForAMovie);

router.put("/reviews/:id");
router.delete("/reviews/:id");

module.exports = router;
