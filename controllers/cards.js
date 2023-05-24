const Card = require("../models/card.js");

const handleError = (res, statusCode, message) => {
  res.status(statusCode).send({ message });
};

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch((err) => handleError(res, 500, err.message));
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const userId = req.user._id;

  if (!name || !link) {
    return handleError(res, 400, "Переданы некорректные данные");
  }

  Card.create({ name, link, owner: userId })
    .then((card) => res.send({ data: card }))
    .catch((err) => handleError(res, 500, err.message));
};

module.exports.getCardById = (req, res) => {
  const cardId = req.params.cardId;

  Card.findById(cardId)
    .then((card) => {
      if (!card) {
        return handleError(res, 404, "Карточка не найдена");
      }
      res.send({ data: card });
    })
    .catch((err) => handleError(res, 500, err.message));
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
        return handleError(res, 404, "Карточка не найдена");
      }
      res.send({ data: card });
    })
    .catch((err) => handleError(res, 500, err.message));
};

module.exports.removeLike = (req, res) => {
  const { cardId } = req.params;
  const userId = req.user._id;

  Card.findByIdAndUpdate(cardId, { $pull: { likes: userId } }, { new: true })
    .then((card) => {
      if (!card) {
        return handleError(res, 404, "Карточка не найдена");
      }
      res.send({ data: card });
    })
    .catch((err) => handleError(res, 500, err.message));
};
