const db = require("../../../config/db");

async function findListByUserAndDescricao(id_usuario, descricao) {
  const [rows] = await db.query(
    "SELECT id FROM listas WHERE id_usuario = ? AND descricao = ?",
    [id_usuario, descricao]
  );
  return rows[0]; 
}

async function createLista(id_usuario, descricao) {
  const [result] = await db.query(
    "INSERT INTO listas (id_usuario, descricao) VALUES (?, ?)",
    [id_usuario, descricao]
  );
  return { id: result.insertId, id_usuario, descricao };
}

async function addGameToList(id_listas, id_game) {
  const [result] = await db.query(
    "INSERT INTO lista_games (id_listas, id_game) VALUES (?, ?)",
    [id_listas, id_game]
  );
  return { id_listas, id_game };
}

async function getListByUser(id_usuario) {
  const [rows] = await db.query(
    "SELECT l.id, l.descricao, lg.id_game FROM listas l LEFT JOIN lista_games lg ON l.id = lg.id_listas WHERE l.id_usuario = ?",
    [id_usuario]
  );
  return rows;
}

module.exports = {
  findListByUserAndDescricao,
  createLista,
  addGameToList,
  getListByUser,
};
