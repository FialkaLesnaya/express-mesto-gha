const router = require('express').Router();
const {
  createCard,
  getCards,
  getCardById,
  addLike,
  removeLike,
  deleteCard,
} = require('../controllers/cards');
const { authMiddleware } = require('../middlewares/auth');

router.get('/', authMiddleware, getCards);
router.post('/', authMiddleware, createCard);
router.get('/:cardId', authMiddleware, getCardById);
router.put('/:cardId/likes', authMiddleware, addLike);
router.delete('/:cardId/likes', authMiddleware, removeLike);
router.delete('/:cardId', authMiddleware, deleteCard);

module.exports = router;
