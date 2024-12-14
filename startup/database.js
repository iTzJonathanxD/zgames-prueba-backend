const mongoose = require("mongoose");
let _server = null;
let _mongoURI = null;


module.exports = class Database {
  constructor({ Server, config }) {
    _server = Server;
    _mongoURI = config.DB_URL;
  }

  connect() {
    mongoose
      .connect(_mongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        readPreference: "secondaryPreferred",
      })
      .then(() => {
        console.log("MongoDB connected successfully");
        return _server.start();
      })
      .catch((error) => {
        console.error("Error connecting to MongoDB:", error.message);
        process.exit(1);
      });
  }
};
