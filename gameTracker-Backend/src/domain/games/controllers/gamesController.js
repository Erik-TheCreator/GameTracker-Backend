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

  async getById(req, res) {
    const {id}=req.params
    try {
      const jogo = await gamesRepository.findById(id);
      if (!jogo) {
        return res.status(404).json({ erro: "Jogo não encontrado" });
      }
      res.status(200).json(jogo);
    } catch (err) {
      console.error("Erro no Controller:", err);
      res.status(500).json({ erro: "Erro ao buscar jogo" });
    }
  }

}

module.exports = new GamesController();