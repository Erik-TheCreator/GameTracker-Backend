const bcrypt = require("bcrypt");
const usuarioRepository = require("../repository/userRepository");

async function login(email, senha) {
  const user = await usuarioRepository.getUserByEmail(email);
  if (!user) {
    throw { status: 401, mensagem: "Usuário não autorizado!" };
  }

  const senhaValida = await bcrypt.compare(senha, user.senha);
  if (!senhaValida) {
    throw { status: 401, mensagem: "Usuário não autorizado!" };
  }

  return user;
}

async function cadastrar(nome, email, senha) {
  if (!nome || !email || !senha) {
    throw { status: 400, mensagem: "Preencha todos os campos." };
  }

  const usuarioExistente = await usuarioRepository.getUserByEmail(email);
  if (usuarioExistente) {
    throw { status: 400, mensagem: "Email já cadastrado." };
  }

  const usuarioExistenteNome = await usuarioRepository.getUserByNome(nome);
  if (usuarioExistenteNome) {
    throw { status: 400, mensagem: "Nome de usuário já cadastrado." };
  }

  const senhaHash = await bcrypt.hash(senha, 10);
  return await usuarioRepository.criarUsuario(nome, email, senhaHash);
}


async function updatePerfil(userId, nome, sobre,foto,bordaPerfil, fotoFundo) {
  if (!nome) {
    throw { status: 400, mensagem: "O nome não pode ser vazio" };
  }

  const usuarioExistente = await usuarioRepository.getUserByNome(nome);
  if (usuarioExistente && usuarioExistente.id !== userId) {
    throw { status: 400, mensagem: "Esse nome já está em uso." };
  }

  const atualizado = await usuarioRepository.updatePerfil(userId, nome, sobre,foto,bordaPerfil, fotoFundo);
  if (!atualizado) {
    throw { status: 400, mensagem: "Nenhuma alteração feita" };
  }

  return {id: userId, nome,sobre, foto,bordaPerfil, fotoFundo };
}

async function getUserById(userId) {
  const user = await usuarioRepository.getUserById(userId);
  if (!user) {
    throw { status: 404, mensagem: "Usuário não encontrado" };
  }

  return {
    id: user.id,
    nome: user.nome,
    foto: user.foto,
    sobre: user.sobre,
    bordaPerfil: user.borda_perfil || "", 
    fotoFundo: user.foto_fundo || "img.webp" 
  };
}

module.exports = {
  login,
  cadastrar,
  updatePerfil,
  getUserById
};
