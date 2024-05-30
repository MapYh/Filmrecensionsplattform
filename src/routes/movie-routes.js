const { Router } = require("express");
const { addAMovieToDb } = require("../controllers/movie-controller");
const { auth } = require("../middleware/role-auth");
const router = Router();

router.use("/movies", addAMovieToDb);

module.exports = router;
