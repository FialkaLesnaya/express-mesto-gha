const router = require('express').Router();
const {
  createCard,
  getCards,
  getCardById,
  addLike,
  removeLike,
  deleteCard,
} = require('../controllers/cards');

router.get('/', getCards);
// joi
router.post('/', createCard);
// joi
router.get('/:cardId', getCardById);
// joi
router.put('/:cardId/likes', addLike);
// joi
router.delete('/:cardId/likes', removeLike);
// joi
router.delete('/:cardId', deleteCard);

module.exports = router;
