const { Products } = require("../models/products");

class ProductsController {
  
  async getProducts(req, res) {
    const list = await Products.find();
    res.status(200).json(list);
  }
  async postProduct(req, res) {
    try {
      const newProduct = new Products(req.body);
      await newProduct.save();
      res.status(201).json(newProduct);
    } catch (error) {
      res.status(400).json(error);
    }
  }
  putProduct(req, res) {
    res.status(201).send("esto es una api put");
  }

  deleteProduct(req, res) {
    res.status(204).send();
  }
}

module.exports = new ProductsController;
