const { Products } = require("../models/products");

class ProductsController {
  async getAllProducts(req, res) {
    try {
      const list = await Products.find();
      res.status(200).json(list);
    } catch (error) {
      res.status(400).json(error);
    }
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

  async putProduct(req, res) {
    const { id } = req.params;

    try {
      const product = await Products.findById(id);

      if (!product) {
        return res.status(404).json({ msg: "Producto no encontrado" });
      }

      await Products.findByIdAndUpdate(id, req.body);

      res.json({
        msg: "Producto actualizado con éxito",
        producto: { ...product.toObject(), ...req.body },
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: "Error en el servidor" });
    }
  }

  async deleteProduct(req, res) {
    const { id } = req.params;

    try {
      const product = await Products.findById(id);

      if (!product) {
        return res.status(404).json({ msg: "Producto no encontrado" });
      }

      await Products.findByIdAndUpdate(id, { estado: false });

      res.json({
        msg: "usuario eliminado con éxito",
      });
    } catch (error) {
      res.json({
        errores: error
      })
    }
  }
}

module.exports = new ProductsController();
