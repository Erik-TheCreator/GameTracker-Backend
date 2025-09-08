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

 module.exports={getLogin};