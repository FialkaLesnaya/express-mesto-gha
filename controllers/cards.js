const Card = require('../models/card');
const {
  DEFAULT_ERROR_CODE,
  NOT_CORRECT_ERROR_CODE,
  NOT_FOUND_ERROR_CODE,
  handleError,
} = require('../utils/utils');

const handleCardError = (res, err) => {
  if (err.name === 'ValidationError') {
    return handleError(res, NOT_CORRECT_ERROR_CODE, 'Переданы некорректные данные');
  }
  return handleError(res, DEFAULT_ERROR_CODE, 'Произошла ошибка');
};

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch(() => handleError(res, DEFAULT_ERROR_CODE, 'Произошла ошибка'));
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const userId = req.user._id;

  return Card.create({ name, link, owner: userId }, { runValidators: true })
    .then((card) => res.send({ data: card }))
    .catch((err) => handleCardError(res, err));
};

module.exports.getCardById = (req, res) => {
  const { cardId } = req.params;

  return Card.findById(cardId, { runValidators: true })
    .then((card) => res.send({ data: card }))
    .catch((err) => handleCardError(res, err));
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
    })
    .catch((err) => handleCardError(res, err));
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
    })
    .catch((err) => handleCardError(res, err));
};

module.exports.deleteCard = (req, res) => {
  const { cardId } = req.params;

  return Card.findByIdAndRemove(cardId, { runValidators: true })
    .then((card) => {
      if (!card) {
        return handleError(res, NOT_FOUND_ERROR_CODE, 'Карточка не найдена');
      }
      return res.send({ data: card });
    })
    .catch((err) => handleCardError(res, err));
};
