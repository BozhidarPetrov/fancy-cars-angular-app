const mongoose = require("mongoose");

const dbName = "cars";
const connectionString = `mongodb://localhost:27017/${dbName}`;
// const connectionString = `mongodb://127.0.0.1:27017/${dbName}`; USE THIS IF YOU ARE HAVING DB CONNECTION ISSUES!


require("../models/User");
require("../models/Car");

module.exports = async () => {
  mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log(`database connected to ${dbName}`);
  try {
    mongoose.connection.on("error", (err) => {
      console.log("database error");
      console.error(err);
    });
  } catch (error) {
    console.error("error connecting to database");
    process.exit(1);
  }
};
