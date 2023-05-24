const router = require("express").Router();
const {
  createCard,
  getCards,
  getCardById,
  addLike,
  removeLike,
  deleteCard,
} = require("../controllers/cards");

router.get("/", getCards);
router.post("/", createCard);
router.get("/:cardId", getCardById);
router.put("/:cardId/likes", addLike);
router.delete("/:cardId/likes", removeLike);
router.delete("/:cardId", deleteCard);

module.exports = router;
