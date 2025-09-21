const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.get("/me", userController.getUser);
router.put("/foto", userController.updateFoto);
router.post("/", userController.cadastrar);
router.put("/", userController.updatePerfil);

module.exports = router;
