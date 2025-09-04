const gamesRepository=require("../repository/gamesRepository")

class GamesController{
      async getAll(req, res) {
    try {
      const dados = await gamesRepository.findAll();
      res.status(200).json(dados);
    } catch (err) {
      console.error("Erro no Controller:", err);
      res.status(500).json({ erro: "Erro ao buscar jogo" });
    }
  }

}

module.exports = new GamesController();