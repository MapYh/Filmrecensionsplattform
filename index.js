require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const connectDB = require("./src/configs/dbconn");
const user_routes = require("./src/routes/user-routes");
const movie_routes = require("./src/routes/movie-routes");
const review_routes = require("./src/routes/reviews-routes");
const app = express();

app.use(express.json());

//Connect to mongoDB.
connectDB();

//Routes
app.use("/", user_routes);
app.use("/", movie_routes);
app.use("/", review_routes);

//If connected to database run server.
mongoose.connection.once("open", () => {
  console.log("Connected to mongoDB.");
  app.listen(process.env.PORT, process.env.URL, async () => {
    console.log(`listening to http://${process.env.URL}:${process.env.PORT}`);
  });
});
