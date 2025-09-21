const bcrypt = require("bcrypt");
const usuarioRepository=require("../repository/userRepository");

 const getLogin = async (req, res) => {
  const { email, senha } = req.body;

  try {
    const user = await usuarioRepository.getUserByEmail(email);
    if (!user) {
      return res.status(401).json({ mensagem: "Usuário não autorizado!" });
    }

    const senhaValida = await bcrypt.compare(senha, user.senha);
    if (!senhaValida) {
      return res.status(401).json({ mensagem: "Usuário não autorizado!" });
    }

    req.session.user = { id: user.id, email: user.email, nome: user.nome, foto: user.foto };
    res.status(200).json({ mensagem: "Login realizado com sucesso", user });

  } catch (err) {
    console.log(err);
    res.status(500).json("Erro no servidor ao tentar fazer o login!");
  }
}



 const updateFoto=async(req,res)=>{
    const { foto } = req.body;

    if (!req.session.user) {
      return res.status(401).json({ mensagem: "Usuário não autenticado" });
    }
  
    const userId = req.session.user.id;
  
    try {
      await usuarioRepository.updateFoto(userId, foto);
  
      req.session.user.foto = foto;
  
      res.status(200).json({ mensagem: "Foto atualizada com sucesso!" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ mensagem: "Erro ao atualizar foto" });
    }

 }

 const updatePerfil = async (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ mensagem: "Usuário não autenticado" });
  }

  const { nome, sobre } = req.body;
  const userId = req.session.user.id;

  if (!nome) {
    return res.status(400).json({ mensagem: "O nome não pode ser vazio" });
  }

  try {
     const usuarioExistente = await usuarioRepository.getUserByNome(nome);
    if (usuarioExistente && usuarioExistente.id !== userId) {
      return res.status(400).json({ mensagem: "Esse nome já está em uso." });
    }
    const atualizado = await usuarioRepository.updatePerfil(userId, nome, sobre);

    if (!atualizado) {
      return res.status(400).json({ mensagem: "Nenhuma alteração feita" });
    }

    req.session.user.nome = nome;

    res.status(200).json({ mensagem: "Perfil atualizado com sucesso!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ mensagem: "Erro ao atualizar perfil" });
  }
};

 async function getUser(req, res) {
  if (!req.session.user) {
    return res.status(401).json({ mensagem: "Usuário não autenticado" });
  }

  try {
    const user = await usuarioRepository.getUserById(req.session.user.id);

    if (!user) {
      return res.status(404).json({ mensagem: "Usuário não encontrado" });
    }

    res.json({
      id: user.id,
      nome: user.nome,
      foto: user.foto,
      sobre:user.sobre
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ mensagem: "Erro ao buscar usuário" });
  }
}

const cadastrar= async (req, res)=>{
     try {
      const { nome, email, senha } = req.body;

      if (!nome || !email || !senha) {
        return res.status(400).json({ erro: "Preencha todos os campos." });
      }

      const usuarioExistente = await usuarioRepository.getUserByEmail(email);
      if (usuarioExistente) {
        return res.status(400).json({ erro: "Email já cadastrado." });
      }

      const usuarioExistenteNome = await usuarioRepository.getUserByNome(nome);
      if (usuarioExistenteNome) {
        return res.status(400).json({ erro: "Nome de usuário já cadastrado." });
      }

      const senhaHash = await bcrypt.hash(senha, 10);

      const novoId = await usuarioRepository.criarUsuario(nome, email, senhaHash);

      res.status(201).json({ mensagem: "Usuário cadastrado com sucesso", id: novoId });
    } catch (err) {
      console.error(err);
      res.status(500).json({ erro: "Erro ao cadastrar usuário." });
    }
  }



 

 module.exports={getLogin,getUser,updateFoto,cadastrar,updatePerfil};