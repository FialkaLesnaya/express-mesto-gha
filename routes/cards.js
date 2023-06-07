const router = require('express').Router();
const { celebrate } = require('celebrate');
const { validateCardBody, validateCardId } = require('../utils/validators');
const {
  createCard,
  getCards,
  getCardById,
  addLike,
  removeLike,
  deleteCard,
} = require('../controllers/cards');

router.get('/', getCards);
router.post('/', celebrate({ body: validateCardBody }), createCard);
router.get('/:cardId', celebrate({ params: validateCardId }), getCardById);
router.put('/:cardId/likes', celebrate({ params: validateCardId }), addLike);
router.delete('/:cardId/likes', celebrate({ params: validateCardId }), removeLike);
router.delete('/:cardId', celebrate({ params: validateCardId }), deleteCard);

module.exports = router;
