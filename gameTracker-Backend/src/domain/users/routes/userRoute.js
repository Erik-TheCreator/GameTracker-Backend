const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.get("/me", userController.getUser);
router.post("/", userController.cadastrar);
router.put("/", userController.updatePerfil);
router.get("/usuario/:id", userController.getUserById);


module.exports = router;
