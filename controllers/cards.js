const Card = require("../models/card.js");
const {
  DEFAULT_ERROR_CODE,
  NOT_CORRECT_ERROR_CODE,
  NOT_FOUND_ERROR_CODE,
  handleError,
  isValidId,
} = require("../utils/utils.js");

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch((err) => handleError(res, DEFAULT_ERROR_CODE, err.message));
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const userId = req.user._id;

  if (
    !name ||
    name.length < 2 ||
    name.length > 30 ||
    !link ||
    !isValidId(userId)
  ) {
    return handleError(
      res,
      NOT_CORRECT_ERROR_CODE,
      "Переданы некорректные данные"
    );
  }

  Card.create({ name, link, owner: userId })
    .then((card) => res.send({ data: card }))
    .catch((err) => handleError(res, DEFAULT_ERROR_CODE, err.message));
};

module.exports.getCardById = (req, res) => {
  const cardId = req.params.cardId;

  if (!isValidId(cardId)) {
    return handleError(res, NOT_FOUND_ERROR_CODE, "Карточка не найдена");
  }

  Card.findById(cardId)
    .then((card) => res.send({ data: card }))
    .catch((err) => handleError(res, DEFAULT_ERROR_CODE, err.message));
};

module.exports.addLike = (req, res) => {
  const { cardId } = req.params;
  const userId = req.user._id;

  if (!isValidId(cardId)) {
    return handleError(res, NOT_FOUND_ERROR_CODE, "Карточка не найдена");
  }

  Card.findByIdAndUpdate(
    cardId,
    { $addToSet: { likes: userId } },
    { new: true }
  )
    .then((card) => res.send({ data: card }))
    .catch((err) => handleError(res, DEFAULT_ERROR_CODE, err.message));
};

module.exports.removeLike = (req, res) => {
  const { cardId } = req.params;
  const userId = req.user._id;

  if (!isValidId(cardId)) {
    return handleError(res, NOT_FOUND_ERROR_CODE, "Карточка не найдена");
  }

  Card.findByIdAndUpdate(cardId, { $pull: { likes: userId } }, { new: true })
    .then((card) => res.send({ data: card }))
    .catch((err) => handleError(res, DEFAULT_ERROR_CODE, err.message));
};

module.exports.deleteCard = (req, res) => {
  const cardId = req.params.cardId;

  if (!isValidId(cardId)) {
    return handleError(res, NOT_FOUND_ERROR_CODE, "Карточка не найдена");
  }

  Card.findByIdAndRemove(cardId)
    .then((card) => res.send({ data: card }))
    .catch((err) => handleError(res, DEFAULT_ERROR_CODE, err.message));
};
