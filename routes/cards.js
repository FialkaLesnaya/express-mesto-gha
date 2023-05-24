const router = require("express").Router();
const {
  createCard,
  getCards,
  getCardById,
  addLike,
  removeLike,
} = require("../controllers/cards");

router.get("/", getCards);
router.post("/", createCard);
router.get("/:cardId", getCardById);
router.put("/:cardId/likes", addLike);
router.delete("/:cardId/likes", removeLike);

module.exports = router;
