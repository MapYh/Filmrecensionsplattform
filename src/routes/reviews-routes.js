const { Router } = require("express");
const {
  addAReviewToAMovie,
  getAllReviews,
  getAllReviewsForAMovie,
  getAReview,
  updateAReview,
  deleteAReview,
} = require("../controllers/review-controller");
const { userAuth } = require("../middleware/role-auth");
const { validate_id } = require("../middleware/validate-id");
const router = Router();

router.post("/reviews", userAuth, addAReviewToAMovie);

router.get("/reviews", userAuth, getAllReviews);
router.get("/reviews/:id", validate_id, userAuth, getAReview);
router.get(
  "/movies/:id/reviews",
  validate_id,
  userAuth,
  getAllReviewsForAMovie
);

router.put("/reviews/:id", validate_id, userAuth, updateAReview);
router.delete("/reviews/:id", validate_id, userAuth, deleteAReview);

module.exports = router;
