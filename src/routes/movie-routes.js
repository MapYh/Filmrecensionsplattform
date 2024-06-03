const { Router } = require("express");
const {
  addAMovieToDb,
  getAllMoviesInDb,
  getMovieById,
  updateAMovieById,
  deleteAMovieById,
  getAverageRatings,
} = require("../controllers/movie-controller");
const { adminAuth, userAuth } = require("../middleware/role-auth");
const { validate_id } = require("../middleware/validate-id");
const router = Router();

router.post("/movies", adminAuth, addAMovieToDb);

router.get("/movies", userAuth, getAllMoviesInDb);
router.get("/movies/ratings", userAuth, getAverageRatings);
router.get("/movies/:id", validate_id, userAuth, getMovieById);

router.put("/movies/:id", validate_id, adminAuth, updateAMovieById);
router.delete("/movies/:id", validate_id, adminAuth, deleteAMovieById);

module.exports = router;
