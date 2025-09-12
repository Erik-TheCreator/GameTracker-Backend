const db =require("../../../config/db.js");

class GamesRepository{
      async findAll(){
 
        const [row]= await db.query("SELECT * FROM games");
        return row


    }

    async findById(id){
      const [row]=await db.query("SELECT * FROM games where id =?",[id])
      return row[0]
    }

    

}

module.exports= new GamesRepository();