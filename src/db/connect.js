const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
require('dotenv').config();


const connect = async () => {
  try {
    await mongoose.connect(process.env.CONNECT_MONGO);
    console.log("base de datos conectada");
  } catch(err) {
    console.log(err);
  }
};

module.exports = { connect };
