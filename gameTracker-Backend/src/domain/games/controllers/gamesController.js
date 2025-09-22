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

  async getAllGames(req, res)  {
  try {
    const games = await gamesRepository.findAllWithDetails(); 
    res.json(games);
  } catch (err) {
    console.error(err);
    res.status(500).json({ mensagem: "Erro ao buscar jogos" });
  }
};


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

  async getFiltered(req, res) {
    try {
      const { genero, ano, plataforma, ordenar, nome } = req.query;

      const jogos = await gamesRepository.findFiltered({
        genero,
        ano,
        plataforma,
        ordenar,
        nome
      });

      res.status(200).json(jogos);
    } catch (err) {
      console.error("Erro no Controller:", err);
      res.status(500).json({ erro: "Erro ao filtrar jogos" });
    }
  }
}

module.exports = new GamesController();