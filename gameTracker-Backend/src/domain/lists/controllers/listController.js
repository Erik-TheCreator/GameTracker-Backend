const listRepository = require("../repository/listRepository");

const addGameToList = async (req, res) => {
  const { id_usuario, id_game, descricao } = req.body;

  if (!id_usuario || !id_game || !descricao) {
    return res.status(400).json({ mensagem: "Usuário, jogo e descrição são obrigatórios" });
  }

  try {
    let lista = await listRepository.findListByUserAndDescricao(id_usuario, descricao);

    if (!lista) {
      lista = await listRepository.createLista(id_usuario, descricao);
    }

    const jogo = await listRepository.addGameToList(lista.id, id_game);

    res.status(201).json({ mensagem: "Jogo adicionado com sucesso", lista, jogo });
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

async function getListasComJogos(req, res) {
  const { id_usuario } = req.params;
  try {
    const listas = await listRepository.getListasComJogos(id_usuario);
    res.json(listas);
  } catch (err) {
    console.error(err);
    res.status(500).json({ mensagem: "Erro ao buscar listas" });
  }
}


module.exports = {
  addGameToList,
  getListByUser,
  getListasComJogos
};
