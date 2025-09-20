const express = require("express");
const router = express.Router();
const reviewController = require("../controllers/reviewController");

router.get("/:id_game", reviewController.getByGame);
router.get("/:id_game/media", reviewController.getAverageRating);
router.post("/", reviewController.create);
router.put("/:id", reviewController.update);
router.delete("/:id", reviewController.delete);

module.exports = router;
