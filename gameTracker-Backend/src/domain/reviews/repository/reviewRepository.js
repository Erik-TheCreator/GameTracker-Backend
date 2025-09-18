const db =require("../../../config/db.js");

exports.getById = async (id) => {
  const [rows] = await db.query("SELECT * FROM reviews WHERE id = ?", [id]);
  return rows[0];
};

exports.getByUserAndGame = async (id_usuario, id_game) => {
  const [rows] = await db.query(
    "SELECT * FROM reviews WHERE id_usuario = ? AND id_game = ?",
    [id_usuario, id_game]
  );
  return rows[0]; 
};


exports.getByGame = async (id_game) => {
  const [result] = await db.query(
    `SELECT r.id, r.id_usuario,r.comentarios, r.data_review,r.rating, u.nome as autor, u.foto
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


exports.update=async (id,comentarios,rating)=>{
  await db.query("UPDATE reviews SET comentarios = ?, rating=? WHERE id = ?", [comentarios, rating, id]);
}


exports.delete=async (id)=>{
  await db.query("DELETE FROM reviews WHERE id = ?", [id]);
}