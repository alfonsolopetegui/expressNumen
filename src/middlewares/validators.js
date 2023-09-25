const { validationResult } = require("express-validator");
const { Users } = require("../models/users");

const validarCampos = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errores: errors.array() });
  }

  next();
};

const emailExiste = async (correo) => {
  const usuario = await Users.findOne({ correo });

  if (usuario) {
    throw new Error("el correo electrónico ya existe");
  }
};

module.exports = {
  validarCampos,
  emailExiste,
};
