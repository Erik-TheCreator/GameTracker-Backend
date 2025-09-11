const express = require("express");
const router = express.Router();
const listController = require("../controllers/listController");

router.post("/", listController.addGameToList);
router.get("/com-jogos/:id_usuario", listController.getListasComJogos);
router.get("/:id_usuario", listController.getListByUser);
router.delete("/:id", listController.deletarLista); 
router.put("/:id", listController.atualizarLista); 
router.delete("/:id/jogo/:jogoId", listController.deletarJogoDaLista);

module.exports = router;
