const { validationResult } = require("express-validator");
const { Users } = require("../models/users");
const { Products } = require("../models/products");

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

const codigoExiste = async (codigo) => {
  const codigoRepetido = await Products.findOne({ codigo });

  if (codigoRepetido) {
    throw new Error("el código introducido ya existe");
  }
};

const productoRepetido = async (nombre) => {
  const nombreRepetido = await Products.findOne({ nombre });

  if (nombreRepetido) {
    throw new Error("el producto ya existe");
  }
};

const monedaValida = (req, res, next) => {
  const { moneda } = req.body.precio;

  if (moneda !== "ARS" && moneda !== "USD") {
    throw new Error("La moneda ingresada no es válida");
  }

  next();
};

module.exports = {
  validarCampos,
  emailExiste,
  codigoExiste,
  productoRepetido,
  monedaValida,
};
