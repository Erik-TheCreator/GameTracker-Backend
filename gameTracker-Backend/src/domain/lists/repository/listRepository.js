const db = require("../../../config/db");

async function addGameToList(id_usuario, id_game, descricao) {
  const [result] = await db.query(
    "INSERT INTO lista (id_usuario, id_game, descricao) VALUES (?, ?, ?)",
    [id_usuario, id_game, descricao]
  );

  return { id: result.insertId, id_usuario, id_game, descricao };
}

async function getListByUser(id_usuario) {
  const [rows] = await db.query(
    "SELECT * FROM lista WHERE id_usuario = ?",
    [id_usuario]
  );
  return rows;
}

module.exports = {
  addGameToList,
  getListByUser,
};