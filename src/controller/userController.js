const { Users } = require("../models/users");
const bcryptjs = require("bcrypt");

class UserController {

  async getUser(req, res) {
    try {
      const { limite = 2, desde = 0 } = req.query;

      const filter = { estado: true };

      const [total, usuarios] = await Promise.all([
        Users.countDocuments(filter),
        Users.find(filter).skip(Number(desde)).limit(Number(limite)),
      ]);

      res.json({
        msg: "Estos son los usuarios en la DB",
        total,
        usuarios,
      });
    } catch (error) {
      res.status(400).json(error);
    }
  }

  async postUser(req, res) {
    try {
      const { password } = req.body;

      const newUser = new Users(req.body);

      const salt = bcryptjs.genSaltSync();

      newUser.password = bcryptjs.hashSync(password, salt);

      await newUser.save();

      res.status(201).json(newUser);
    } catch (error) {
      res.status(400).json(error);
    }
  }

  async putUser(req, res) {
    const { id } = req.params;
    const { password } = req.body;

    try {
      const usuario = await Users.findById(id);

      if (!usuario) {
        return res.status(404).json({ msg: "Usuario no encontrado" });
      }

      if (password) {
        const salt = bcryptjs.genSaltSync();
        req.body.password = bcryptjs.hashSync(password, salt);
      }

      await Users.findByIdAndUpdate(id, req.body);

      res.json({
        msg: "usuario actualizado con éxito",
        usuario: { ...usuario.toObject(), ...req.body },
      });
      
    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: "Error en el servidor" });
    }
  }

  async deleteUser(req, res) {
    try {
      const { id } = req.params;

    //borrado físico
    //await Users.findByIdAndDelete(id)

    //borrado lógico
    await Users.findByIdAndUpdate(id, { estado: false });

    res.json({
      msg: "Usuario eliminado con éxito",
    });
    } catch (error) {
      res.json({
        errores: error
      })
    }
    
  }
}

module.exports = new UserController();
