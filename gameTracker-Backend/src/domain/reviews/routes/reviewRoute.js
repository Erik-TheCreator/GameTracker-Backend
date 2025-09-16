const express = require("express");
const router = express.Router();
const reviewController = require("../controllers/reviewController");

router.get("/:id_game", reviewController.getByGame);
router.post("/", reviewController.create);

module.exports = router;
