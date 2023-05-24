const Card = require("../models/card.js");

const DEFAULT_ERROR_CODE = 500;
const NOT_CORRECT_ERROR_CODE = 400;
const NOT_FOUND_ERROR_CODE = 404;

const handleError = (res, statusCode, message) => {
  res.status(statusCode).send({ message });
};

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch((err) => handleError(res, DEFAULT_ERROR_CODE, err.message));
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const userId = req.user._id;

  if (!name || name.length < 2 || name.length > 30 || !link) {
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

  Card.findById(cardId)
    .then((card) => {
      if (!card) {
        return handleError(res, NOT_FOUND_ERROR_CODE, "Карточка не найдена");
      }
      res.send({ data: card });
    })
    .catch((err) => handleError(res, DEFAULT_ERROR_CODE, err.message));
};

module.exports.addLike = (req, res) => {
  const { cardId } = req.params;
  const userId = req.user._id;

  Card.findByIdAndUpdate(
    cardId,
    { $addToSet: { likes: userId } },
    { new: true }
  )
    .then((card) => {
      if (!card) {
        return handleError(res, NOT_FOUND_ERROR_CODE, "Карточка не найдена");
      }
      res.send({ data: card });
    })
    .catch((err) => handleError(res, DEFAULT_ERROR_CODE, err.message));
};

module.exports.removeLike = (req, res) => {
  const { cardId } = req.params;
  const userId = req.user._id;

  Card.findByIdAndUpdate(cardId, { $pull: { likes: userId } }, { new: true })
    .then((card) => {
      if (!card) {
        return handleError(res, NOT_FOUND_ERROR_CODE, "Карточка не найдена");
      }
      res.send({ data: card });
    })
    .catch((err) => handleError(res, DEFAULT_ERROR_CODE, err.message));
};

module.exports.deleteCard = (req, res) => {
  const cardId = req.params.cardId;

  Card.findByIdAndRemove(cardId)
    .then((card) => {
      if (!card) {
        return handleError(res, NOT_FOUND_ERROR_CODE, "Карточка не найдена");
      }
      res.send({ data: card });
    })
    .catch((err) => handleError(res, DEFAULT_ERROR_CODE, err.message));
};
