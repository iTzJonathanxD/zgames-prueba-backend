const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
      required: [true, "El nombre de usuario es obligatorio"],
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      required: [true, "El correo electrónico es obligatorio"],
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "La contraseña es obligatoria"],
    },
    role: {
      type: String,
      enum: ["guest", "host", "admin"],
      default: "guest",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
