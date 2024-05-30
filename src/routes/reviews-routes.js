const { Router } = require("express");
const { addAReviewToAMovie } = require("../controllers/review-controller");
const { adminAuth, userAuth } = require("../middleware/role-auth");
const router = Router();

router.post("/reviews", userAuth, addAReviewToAMovie);

router.get("/reviews");

router.get("/reviews/:id");
router.get("/movies/:id/reviews");

router.put("/reviews/:id");
router.delete("/reviews/:id");

module.exports = router;
