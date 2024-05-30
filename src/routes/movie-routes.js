const { Router } = require("express");
const {
  addAMovieToDb,
  getAllMoviesInDb,
  getMovieById,
  updateAMovieById,
  deleteAMovieById,
} = require("../controllers/movie-controller");
const { adminAuth, userAuth } = require("../middleware/role-auth");
const router = Router();

router.post("/movies", adminAuth, addAMovieToDb);

router.get("/movies", userAuth, getAllMoviesInDb);
router.get("/movies/:id", userAuth, getMovieById);

router.put("/movies/:id", adminAuth, updateAMovieById);

router.delete("/movies/:id", adminAuth, deleteAMovieById);

module.exports = router;
