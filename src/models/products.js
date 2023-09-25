const { Schema, model } = require("mongoose");

const ProductSchema = new Schema({
  item: {
    type: String,
    required: true,
  },
  nombre: {
    type: String,
    required: true,
  },
  marca: {
    type: String,
    required: true,
  },
  descripcion: {
    type: String,
    required: true,
  },
  precio: {
    base: {
      type: Number,
      required: true,
    },
    moneda: {
      type: String,
      required: true,
    },
  },
  codigo: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  cantidad: {
    type: Number,
    required: true,
  },
  img: {
    type: String,
  },
  estado: {
    type: Boolean,
    default: true,
  },
});

const Products = model("Product", ProductSchema);
module.exports = { Products };
