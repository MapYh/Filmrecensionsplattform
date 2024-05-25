const express = require("express");
const mongoose = require("mongoose");
const connectDB = require("./src/configs/dbconn");
const app = express();

const PORT = 8000;
const URL = "127.0.0.1";
app.use(express.json());

//Connect to mongoDB.
connectDB();

//If connected run server.
mongoose.connection.once("open", () => {
  console.log("Connected to mongoDB.");
  app.listen(PORT, URL, async () => {
    console.log(`listening to http://${URL}:${PORT}`);
  });
});
