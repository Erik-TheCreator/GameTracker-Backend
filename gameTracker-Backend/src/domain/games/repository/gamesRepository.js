const db =require("../../../config/db.js");

class GamesRepository{
      async findAll(){
 
        const [row]= await db.query("SELECT * FROM games");
        return row
    }

}

module.exports= new GamesRepository();