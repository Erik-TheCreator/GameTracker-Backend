const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.get("/me", userController.getUser);
router.post("/", userController.cadastrar);
router.put("/", userController.updatePerfil);
router.get("/usuario/:id", userController.getUserById);
router.post("/logout", (req, res) => {
  res.clearCookie("token"); 
  return res.status(200).json({ mensagem: "Logout realizado com sucesso" });
});



module.exports = router;
