const mongoose = require("mongoose");

const dbConnection = async () => {
  return mongoose.connect(process.env.DB_CONNECTION, () => {
    console.log("DB Connceted");
  });
};
module.exports = dbConnection;
