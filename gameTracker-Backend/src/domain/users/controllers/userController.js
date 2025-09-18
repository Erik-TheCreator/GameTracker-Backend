const usuarioRepository=require("../repository/userRepository");

 const getLogin= async (req, res)=>{
    const {email,senha}=req.body;

    try{
        const user= await usuarioRepository.validateUser(email,senha);

        if(!user){
            return res.status(401).json({mensagem:"Usuário não autorizado !"})
        }

        req.session.user = { id: user.id, email: user.email }
        res.status(200).json({mensagem:"Login realizado com sucesso",user})


    }catch(err){
        console.log(err)
        res.status(500).json("Erro no servidor ao tentar fazer o login !")
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

 const getUser=async(req,res)=>{
    if (!req.session.user) {
        return res.status(401).json({ mensagem: "Usuário não autenticado" });
      }
    
      try {
        const user = await usuarioRepository.getUserById(req.session.user.id);
        res.json(user);
      } catch (err) {
        console.error(err);
        res.status(500).json({ mensagem: "Erro ao buscar usuário" });
      }

 }

 

 module.exports={getLogin,getUser,updateFoto};