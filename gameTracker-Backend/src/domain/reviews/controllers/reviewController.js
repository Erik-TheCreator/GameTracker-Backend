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

    await reviewRepository.create(id_usuario, id_game, review,rating);
    
    return res.status(201).json({ message: "Review criada com sucesso!" });

  } catch (err) {
    console.error("Erro ao criar review:", err);
    return res.status(500).json({ error: err.message });
  }
};


