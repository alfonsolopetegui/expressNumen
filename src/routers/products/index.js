const express = require("express");
const ProductsController = require("../../controller/productsController");
const router = express.Router();

router.get("/productList", ProductsController.getProducts);
router.post("/productCreate", ProductsController.postProduct);
router.put("/productEdit", ProductsController.putProduct);
router.delete("/productDelete", ProductsController.deleteProduct);

module.exports = router;
