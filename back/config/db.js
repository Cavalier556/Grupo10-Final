const mongoose = require("mongoose");

const conectarDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/grupo10", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (error) {
    console.log("Error: " + error.message);
    process.exit(1);
  }
};

module.exports = conectarDB;
