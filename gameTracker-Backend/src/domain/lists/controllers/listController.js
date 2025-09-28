const listRepository = require("../repository/listRepository");

const addGameToList = async (req, res) => {
  try {
    const { id_usuario, id_game, descricao } = req.body;

    // Verifica se já existe uma lista com esse nome
    let lista = await listRepository.findListByUserAndDescricao(id_usuario, descricao);

    if (!lista) {
      // Cria a lista se não existir
      lista = await listRepository.createLista(id_usuario, descricao);
    } else if (req.body.novaLista) {
      // Se o front estiver tentando criar nova lista, bloqueia duplicidade
      return res.status(400).json({ mensagem: "Você já tem uma lista com esse nome." });
    }

    // Verifica se o jogo já está na lista
    const jogoExistente = await listRepository.findGameInList(lista.id, id_game);
    if (jogoExistente) {
      return res.status(400).json({ mensagem: "Este jogo já está nesta lista." });
    }

    await listRepository.addGameToList(lista.id, id_game);

    res.status(201).json({ mensagem: "Jogo adicionado à lista com sucesso", lista });
  } catch (err) {
    console.error(err);
    res.status(500).json({ mensagem: "Erro ao adicionar jogo à lista" });
  }
};



const getListasComJogos = async (req, res) => {
  try {
    const { id_usuario } = req.params;
    const listas = await listRepository.getListasComJogos(id_usuario);
    res.status(200).json(listas);
  } catch (err) {
    console.error(err);
    res.status(500).json({ mensagem: "Erro ao buscar listas com jogos" });
  }
};

const getListByUser = async (req, res) => {
  try {
    const { id_usuario } = req.params;
    const listas = await listRepository.getListByUser(id_usuario);
    res.status(200).json(listas);
  } catch (err) {
    console.error(err);
    res.status(500).json({ mensagem: "Erro ao buscar listas do usuário" });
  }
};


const deletarLista = async (req, res) => {
  try {
    const { id } = req.params;
    await listRepository.deleteLista(id);
    res.status(200).json({ mensagem: "Lista deletada com sucesso" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ mensagem: "Erro ao deletar lista" });
  }
};

const atualizarLista = async (req, res) => {
  try {
    const { id } = req.params;
    const { descricao, id_usuario } = req.body; 
    const listaExistente = await listRepository.findListByUserAndDescricao(id_usuario, descricao);

    if (listaExistente && listaExistente.id !== parseInt(id)) {
      return res.status(400).json({ mensagem: "Você já possui uma lista com esse nome." });
    }

    await listRepository.updateLista(id, descricao);
    res.status(200).json({ mensagem: "Lista atualizada com sucesso" });
  } catch (err) {
    console.error("Erro no backend:", err); 
    res.status(500).json({ mensagem: "Erro ao atualizar lista" });
  }
};


const deletarJogoDaLista = async (req, res) => {
  try {
    const { id, jogoId } = req.params;
    await listRepository.deleteJogoDaLista(id, jogoId);
    res.status(200).json({ mensagem: "Jogo removido da lista com sucesso" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ mensagem: "Erro ao remover jogo da lista" });
  }
};



module.exports = {
  addGameToList,
  getListasComJogos,
  getListByUser,
  deletarLista,
  atualizarLista,
  deletarJogoDaLista
};
