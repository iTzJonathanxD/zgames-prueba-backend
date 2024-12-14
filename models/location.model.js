const mongoose = require("mongoose");

const LocationSchema = new mongoose.Schema(
  {
    country: {
      type: String,
      trim: true,
    },
    city: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Location", LocationSchema);
