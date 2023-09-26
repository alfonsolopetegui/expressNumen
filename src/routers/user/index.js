const express = require("express");
const UserController = require("../../controller/userController");
const router = express.Router();
const { check } = require("express-validator");
const { emailExiste, validarCampos } = require("../../middlewares/validators");

router.get("/userList", UserController.getUser);

router.post(
  "/userCreate",
  [
    check("nombre", "el nombre es obligatorio").not().isEmpty(),
    check("password", "El password debe tener al menos 6 caracteres").isLength({
      min: 6,
    }),
    check("correo", "el correo no es válido").isEmail(),
    check("correo").custom(emailExiste),
    validarCampos,
  ],
  UserController.postUser
);

router.put(
  "/userEdit/:id",
  [check("id", "No es un ID válido").isMongoId(), validarCampos],
  UserController.putUser
);

router.delete(
  "/userDelete/:id",
  [check("id", "No es un ID válido").isMongoId(), validarCampos],
  UserController.deleteUser
);

module.exports = router;
