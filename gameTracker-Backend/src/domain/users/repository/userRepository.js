const db =require("../../../config/db.js");

class UsuarioRepository{

    async getUsersAll(){
        const [rows]= await db.query("SELECT * FROM usuario");
        return rows
    }
    async getUserByNome(nome) {
  const [rows] = await db.query("SELECT * FROM usuario WHERE nome = ?", [nome]);
  return rows[0];
}


    async getUserById(id) {
        const [rows] = await db.query("SELECT * FROM usuario WHERE id = ?", [id]);
        return rows[0];
      }

    async getUserByEmail(email) {
        const [rows] = await db.query("SELECT * FROM usuario WHERE email = ?", [email]);
        return rows[0]; 
    };


    async validateUser(email, senha) {
        const user = await this.getUserByEmail(email);
        if (!user) return null;
    
        if (user.senha === senha) {
            return user;
        }

        return null;
    }

    async updateFoto(id,foto){
        const query = "UPDATE usuario SET foto = ? WHERE id = ?";
        await db.query(query, [foto, id]);
        return query
    }
    async updatePerfil(userId, nome, sobre) {
  const [result] = await db.query(
    "UPDATE usuario SET nome = ?, sobre = ? WHERE id = ?",
    [nome, sobre, userId]
  );
  return result.affectedRows > 0;
}

      async criarUsuario(nome, email, senhaHash) {
    const [result] = await db.query(
      "INSERT INTO usuario (nome, email, senha) VALUES (?, ?, ?)",
      [nome, email, senhaHash]
    );
    return result.insertId;
  }



}


module.exports= new UsuarioRepository();