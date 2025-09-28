const userService = require("../services/userService");
async function getUserById(req, res) {
  const { id } = req.params;
  try {
    const user = await userService.getUserById(id);
    res.json(user);
  } catch (err) {
    res.status(500).json({ mensagem: "Erro ao buscar usuário" });
  }
}


async function getLogin(req, res) {
  const { email, senha } = req.body;
  try {
    const user = await userService.login(email, senha);
    req.session.user = { id: user.id, email: user.email, nome: user.nome, foto: user.foto };
    res.status(200).json({ mensagem: "Login realizado com sucesso", user });
  } catch (err) {
    res.status(err.status || 500).json({ mensagem: err.mensagem || "Erro ao fazer login" });
  }
}

async function cadastrar(req, res) {
  const { nome, email, senha } = req.body;
  try {
    const novoId = await userService.cadastrar(nome, email, senha);
    res.status(201).json({ mensagem: "Usuário cadastrado com sucesso", id: novoId });
  } catch (err) {
    res.status(err.status || 500).json({ mensagem: err.mensagem || "Erro ao cadastrar usuário" });
  }
}


async function updatePerfil(req, res) {
  if (!req.session.user) {
    return res.status(401).json({ mensagem: "Usuário não autenticado" });
  }

  const { nome, sobre,foto,bordaPerfil, fotoFundo } = req.body;
  const userId = req.session.user.id;

  try {
    const atualizado = await userService.updatePerfil(userId, nome,sobre,foto, bordaPerfil, fotoFundo);
    req.session.user.nome = atualizado.nome;
    req.session.user.foto = atualizado.foto;
    req.session.user.bordaPerfil = atualizado.bordaPerfil;
    req.session.user.fotoFundo = atualizado.fotoFundo;

    res.status(200).json({ mensagem: "Perfil atualizado com sucesso!" });
  } catch (err) {
    res.status(err.status || 500).json({ mensagem: err.mensagem || "Erro ao atualizar perfil" });
  }
}

async function getUser(req, res) {
  if (!req.session.user) {
    return res.status(401).json({ mensagem: "Usuário não autenticado" });
  }

  try {
    const user = await userService.getUserById(req.session.user.id);
    res.json(user);
  } catch (err) {
    res.status(err.status || 500).json({ mensagem: err.mensagem || "Erro ao buscar usuário" });
  }
}
 
module.exports = {
  getUserById,
  getLogin,
  cadastrar,
  updatePerfil,
  getUser
};
