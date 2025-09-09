const listRepository = require("../repository/listRepository");

const addGameToList = async (req, res) => {
  const { id_usuario, id_game, descricao } = req.body;

  if (!id_usuario || !id_game) {
    return res.status(400).json({ mensagem: "Usuário e jogo são obrigatórios" });
  }

  try {
    const novoRegistro = await listRepository.addGameToList(id_usuario, id_game, descricao);
    res.status(201).json(novoRegistro);
  } catch (err) {
    console.error(err);
    res.status(500).json({ mensagem: "Erro ao adicionar jogo à lista" });
  }
};

const getListByUser = async (req, res) => {
  const { id_usuario } = req.params;

  try {
    const lista = await listRepository.getListByUser(id_usuario);
    res.json(lista);
  } catch (err) {
    console.error(err);
    res.status(500).json({ mensagem: "Erro ao buscar lista" });
  }
};

module.exports = {
  addGameToList,
  getListByUser,
};
