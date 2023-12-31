const { Schema, model } = require("mongoose");

const UserSchema = new Schema({
  nombre: {
    type: String,
    required: [true, "el nombre es obligatorio"],
  },
  correo: {
    type: String,
    required: [true, "el correo es obligatorio"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "la contraseña es obligatoria"],
  },
  img: {
    type: String,
  },
  rol: {
    type: String,
    required: true,
    enum: ["ADMIN_ROLE", "USER_ROLE"],
  },
  estado: {
    type: Boolean,
    default: true,
  },
  google: {
    type: Boolean,
    default: false,
  },
});

const Users = model("User", UserSchema);
module.exports = { Users };
