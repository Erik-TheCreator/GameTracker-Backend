const db =require("../../../config/db.js");

class GamesRepository{
      async findAll(){
 
        const [row]= await db.query("SELECT * FROM games");
        return row


    }

    async findById(id){
      const [row]=await db.query(`
      SELECT g.*,
             GROUP_CONCAT(DISTINCT p.nome) AS plataformas,
             GROUP_CONCAT(DISTINCT ge.nome) AS generos
      FROM games g
      LEFT JOIN game_plataformas gp ON g.id = gp.id_game
      LEFT JOIN plataformas p ON gp.id_plataforma = p.id
      LEFT JOIN game_generos gg ON g.id = gg.id_game
      LEFT JOIN generos ge ON gg.id_genero = ge.id
      WHERE g.id = ?
      GROUP BY g.id
    `,[id])
      return row[0]
    }

    

}

module.exports= new GamesRepository();