const Card = require('../models/card');
const {
  DEFAULT_ERROR_CODE,
  NOT_CORRECT_ERROR_CODE,
  NOT_FOUND_ERROR_CODE,
  handleError,
  isValidId,
} = require('../utils/utils');

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch(() => handleError(res, DEFAULT_ERROR_CODE, 'Произошла ошибка'));
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const userId = req.user._id;

  if (
    !name
    || name.length < 2
    || name.length > 30
    || !link
    || !isValidId(userId)
  ) {
    return handleError(
      res,
      NOT_CORRECT_ERROR_CODE,
      'Переданы некорректные данные',
    );
  }

  return Card.create({ name, link, owner: userId })
    .then((card) => res.send({ data: card }))
    .catch(() => handleError(res, DEFAULT_ERROR_CODE, 'Произошла ошибка'));
};

module.exports.getCardById = (req, res) => {
  const { cardId } = req.params;

  if (!isValidId(cardId)) {
    return handleError(res, NOT_CORRECT_ERROR_CODE, 'Карточка не найдена');
  }

  return Card.findById(cardId)
    .then((card) => res.send({ data: card }))
    .catch(() => handleError(res, DEFAULT_ERROR_CODE, 'Произошла ошибка'));
};

module.exports.addLike = (req, res) => {
  const { cardId } = req.params;
  const userId = req.user._id;

  if (!isValidId(cardId)) {
    return handleError(res, NOT_CORRECT_ERROR_CODE, 'Карточка не найдена');
  }

  return Card.findByIdAndUpdate(
    cardId,
    { $addToSet: { likes: userId } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        return handleError(res, NOT_FOUND_ERROR_CODE, 'Карточка не найдена');
      }
      return res.send({ data: card });
    })
    .catch(() => handleError(res, DEFAULT_ERROR_CODE, 'Произошла ошибка'));
};

module.exports.removeLike = (req, res) => {
  const { cardId } = req.params;
  const userId = req.user._id;

  if (!isValidId(cardId)) {
    return handleError(res, NOT_CORRECT_ERROR_CODE, 'Карточка не найдена');
  }

  return Card.findByIdAndUpdate(cardId, { $pull: { likes: userId } }, { new: true })
    .then((card) => {
      if (!card) {
        return handleError(res, NOT_FOUND_ERROR_CODE, 'Карточка не найдена');
      }
      return res.send({ data: card });
    })
    .catch(() => handleError(res, DEFAULT_ERROR_CODE, 'Произошла ошибка'));
};

module.exports.deleteCard = (req, res) => {
  const { cardId } = req.params;

  if (!isValidId(cardId)) {
    return handleError(res, NOT_CORRECT_ERROR_CODE, 'Карточка не найдена');
  }

  return Card.findByIdAndRemove(cardId)
    .then((card) => {
      if (!card) {
        return handleError(res, NOT_FOUND_ERROR_CODE, 'Карточка не найдена');
      }
      return res.send({ data: card });
    })
    .catch(() => handleError(res, DEFAULT_ERROR_CODE, 'Произошла ошибка'));
};
