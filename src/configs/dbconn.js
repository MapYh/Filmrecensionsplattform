require("dotenv").config();
const mongoose = require("mongoose");

const connectdb = async () => {
  const connectionpOptions = {
    dbName: `individual-examination`,
  };
  try {
    await mongoose.connect(process.env.DATABASE_URL, connectionpOptions);
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectdb;
