const router = require("express").Router();
const { createCard, getCards, getCardById } = require("../controllers/cards");

router.get("/", getCards);
router.post("/", createCard);
router.get("/:cardId", getCardById);

module.exports = router;
