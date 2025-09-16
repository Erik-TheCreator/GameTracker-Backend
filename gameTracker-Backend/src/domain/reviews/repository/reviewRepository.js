const db =require("../../../config/db.js");

exports.getByGame = async (id_game) => {
  const [result] = await db.query(
    `SELECT r.id, r.comentarios, r.data_review,r.rating, u.nome as autor
     FROM reviews r
     JOIN usuario u ON r.id_usuario = u.id
     WHERE r.id_game = ?
     ORDER BY r.data_review`,
    [id_game]
  );

    return result.map(r => ({
    ...r,
    data_review: r.data_review.toISOString()
  }));
};



exports.create = async (id_usuario, id_game, review,rating) => {
  try {
    await db.query(
      `INSERT INTO reviews (id_usuario, id_game, comentarios, rating) VALUES (?, ?, ?, ?)`,
      [id_usuario, id_game, review, rating]
    );
  } catch (err) {
    console.error("Erro no db:", err);
    throw err;
  }
};
