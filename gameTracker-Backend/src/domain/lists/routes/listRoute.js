const express = require("express");
const router = express.Router();
const listController = require("../controllers/listController");

router.post("/", listController.addGameToList);

router.get("/:id_usuario", listController.getListByUser);

module.exports = router;