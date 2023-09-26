const express = require("express");
const ProductsController = require("../../controller/productsController");
const router = express.Router();
const { check } = require("express-validator");
const {
  codigoExiste,
  productoRepetido,
  validarCampos,
  monedaValida,
} = require("../../middlewares/validators");

router.get("/productsList", ProductsController.getAllProducts);

router.post(
  "/productCreate",
  [
    check("nombre").custom(productoRepetido),
    check("codigo").isLength({ min: 5, max: 5 }).custom(codigoExiste),
    monedaValida,
    validarCampos,
  ],
  ProductsController.postProduct
);

router.put(
  "/productEdit/:id",
  [check("id", "No es un ID válido").isMongoId(), validarCampos],
  ProductsController.putProduct
);

router.delete(
  "/productDelete/:id",
  [check("id", "No es un ID válido").isMongoId(), validarCampos],
  ProductsController.deleteProduct
);

module.exports = router;
