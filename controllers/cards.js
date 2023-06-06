const Card = require('../models/card');
const {
  NOT_FOUND_ERROR_CODE,
  handleError,
} = require('../utils/utils');

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }));
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const userId = req.user._id;

  return Card.create({
    name, link, owner: userId,
  })
    .then((card) => res.send({ data: card }));
};

module.exports.getCardById = (req, res) => {
  const { cardId } = req.params;

  return Card.findById(cardId)
    .then((card) => res.send({ data: card }));
};

module.exports.addLike = (req, res) => {
  const { cardId } = req.params;
  const userId = req.user._id;

  return Card.findByIdAndUpdate(
    cardId,
    { $addToSet: { likes: userId } },
    { new: true, runValidators: true },
  )
    .then((card) => {
      if (!card) {
        return handleError(res, NOT_FOUND_ERROR_CODE, 'Карточка не найдена');
      }
      return res.send({ data: card });
    });
};

module.exports.removeLike = (req, res) => {
  const { cardId } = req.params;
  const userId = req.user._id;

  return Card.findByIdAndUpdate(
    cardId,
    { $pull: { likes: userId } },
    { new: true, runValidators: true },
  )
    .then((card) => {
      if (!card) {
        return handleError(res, NOT_FOUND_ERROR_CODE, 'Карточка не найдена');
      }
      return res.send({ data: card });
    });
};

module.exports.deleteCard = (req, res) => {
  const { cardId } = req.params;
  const userId = req.user._id;

  return Card.findByIdAndRemove(cardId)
    .then((card) => {
      if (!card) {
        return handleError(res, NOT_FOUND_ERROR_CODE, 'Карточка не найдена');
      }

      if (card.userId !== userId) {
        return handleError(res, 409, 'Нет разрешения на удаление этой карточки');
      }
      return res.send({ data: card });
    });
};
