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

    async findFiltered({ genero, ano, plataforma, ordenar }) {
      let query = `
        SELECT g.id, g.titulo, g.data_lancamento, g.capa,
               IFNULL(AVG(r.nota), 0) AS media_rating,
               GROUP_CONCAT(DISTINCT ge.nome) AS generos,
               GROUP_CONCAT(DISTINCT p.nome) AS plataformas
        FROM games g
        LEFT JOIN reviews r ON g.id = r.id_game
        LEFT JOIN game_generos gg ON g.id = gg.id_game
        LEFT JOIN generos ge ON gg.id_genero = ge.id
        LEFT JOIN game_plataformas gp ON g.id = gp.id_game
        LEFT JOIN plataformas p ON gp.id_plataforma = p.id
        WHERE 1=1
      `;
  
      const params = [];
  
      if (genero) {
        query += " AND ge.nome = ? ";
        params.push(genero);
      }
      if (ano) {
        query += " AND g.ano = ? ";
        params.push(ano);
      }
      if (plataforma) {
        query += " AND p.nome = ? ";
        params.push(plataforma);
      }
  
      query += " GROUP BY g.id ";
  
      if (ordenar === "rating") {
        query += " ORDER BY media_rating DESC ";
      } else if (ordenar === "ano") {
        query += " ORDER BY g.ano DESC ";
      } else {
        query += " ORDER BY g.titulo ASC ";
      }
  
      const [rows] = await db.query(query, params);
      return rows;
    }
  }   



module.exports= new GamesRepository();