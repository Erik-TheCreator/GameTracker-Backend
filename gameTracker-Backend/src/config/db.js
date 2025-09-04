const mysql=require("mysql2/promise")
require("dotenv").config({path: __dirname+ "/../../.env"})
const db = mysql.createPool({

    host: process.env.DB_HOST,       // endereço do servidor MySQL
    user: process.env.DB_USER,            // usuário do banco
    password: process.env.DB_PASSWORD || "", // senha do banco
    database: process.env.DB_DATABASE,// nome do banco de dados
    waitForConnections: true,
    connectionLimit: 10,     // número máximo de conexões simultâneas
    queueLimit: 0
  });
   
  module.exports = db;
