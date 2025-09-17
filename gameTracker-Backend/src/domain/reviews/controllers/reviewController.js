const reviewRepository = require("../repository/reviewRepository");

exports.getByGame = async (req, res) => {
  try {
    const { id_game } = req.params;
    const reviews = await reviewRepository.getByGame(id_game);
    res.json(reviews); 
  } catch (err) {
    console.error(err);
    res.json([]);
  }
};

exports.create = async (req, res) => {
  try {
    const { id_usuario, id_game, review, rating } = req.body;

    if (id_usuario == null || id_game == null || !review || rating == null) {
      return res.status(400).json({ error: "Dados incompletos" });
    }

    const existente = await reviewRepository.getByUserAndGame(id_usuario, id_game);
    if (existente) {
      return res.status(400).json({ error: "Você já comentou este jogo!" });
    }

    await reviewRepository.create(id_usuario, id_game, review, rating);
    return res.status(201).json({ message: "Review criada com sucesso!" });

  } catch (err) {
    console.error("Erro ao criar review:", err);
    return res.status(500).json({ error: err.message });
  }
};



exports.update=async(req,res)=>{
  const { id } = req.params
  const {comentarios,rating}=req.body
  const userId = req.session.user.id

  try {
    const review = await reviewRepository.getById(id);
    if (!review) {
      return res.status(404).json({ mensagem: "Review não encontrada" });
    }

    if (review.id_usuario !== userId) {
      return res.status(403).json({ mensagem: "Você não pode editar esta review" });
    }

    await reviewRepository.update(id, comentarios,rating);
    res.status(200).json({ mensagem: "Review atualizada com sucesso" });
  } catch (err) {
    res.status(500).json({ mensagem: "Erro ao editar review", erro: err });
  }
}


exports.delete=async(req,res)=>{
  const { id } = req.params;
  const userId = req.session.user.id;

  try {
    const review = await reviewRepository.getById(id);
    if (!review) {
      return res.status(404).json({ mensagem: "Review não encontrada" });
    }

    if (review.id_usuario !== userId) {
      return res.status(403).json({ mensagem: "Você não pode excluir esta review" });
    }

    await reviewRepository.delete(id);
    res.status(200).json({ mensagem: "Review excluída com sucesso" });
  } catch (err) {
    res.status(500).json({ mensagem: "Erro ao excluir review", erro: err });
  }
}




