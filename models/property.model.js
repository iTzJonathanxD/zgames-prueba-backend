const mongoose = require("mongoose");

const PropertySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "El nombre de la propiedad es obligatorio"],
      trim: true,
    },
    location: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Location",
    },
    propertyType: {
      type: String,
      enum: ["house", "apartment", "villa", "cabin", "hotel"],
      required: [true, "El tipo de propiedad es obligatorio"],
    },
    pricePerNight: {
      type: Number,
      required: [true, "El precio por noche es obligatorio"],
      min: [0, "El precio no puede ser negativo"],
    },
    amenities: [
      {
        type: String,
      },
    ],
    availability: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Property", PropertySchema);
