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

async function getListasComJogos(id_usuario) {
  const [listas] = await db.query("SELECT * FROM listas WHERE id_usuario = ?", [id_usuario]);

  for (let lista of listas) {
    const [games] = await db.query(
      `SELECT g.* 
       FROM lista_games lg
       JOIN games g ON lg.id_game = g.id
       WHERE lg.id_listas = ?`,
      [lista.id]
    );
    lista.games = games;
  }

  return listas;
}


async function deleteLista(id) {
  await db.query("DELETE FROM lista_games WHERE id_listas = ?", [id]); 
  await db.query("DELETE FROM listas WHERE id = ?", [id]); 
}

async function updateLista(id, descricao) {
  await db.query("UPDATE listas SET descricao = ? WHERE id = ?", [descricao, id]);
}

async function deleteJogoDaLista(listaId, jogoId) {
  await db.query("DELETE FROM lista_games WHERE id_listas = ? AND id_game = ?", [listaId, jogoId]);
}

module.exports = {
  findListByUserAndDescricao,
  createLista,
  addGameToList,
  getListByUser,
  getListasComJogos,
  deleteLista,
  updateLista,
  deleteJogoDaLista
};
