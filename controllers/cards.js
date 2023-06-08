const Card = require('../models/card');
const {
  NOT_FOUND_ERROR_CODE,
  NO_ACCESS_ERROR_CODE,
  CREATION_SUCCESS_CODE,
} = require('../utils/utils');

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch((error) => next(error));
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  const userId = req.user._id;

  return Card.create({
    name, link, owner: userId,
  })
    .then((card) => res.status(CREATION_SUCCESS_CODE).send({ data: card }))
    .catch((error) => {
      if (error.name === 'ValidationError') {
        return next(error);
      }

      return next(error);
    });
};

module.exports.getCardById = (req, res, next) => {
  const { cardId } = req.params;

  return Card.findById(cardId)
    .then((card) => res.send({ data: card }))
    .catch((error) => next(error));
};

module.exports.addLike = (req, res, next) => {
  const { cardId } = req.params;
  const userId = req.user._id;

  return Card.findById(cardId)
    .then((card) => {
      if (!card) {
        const error = new Error();
        error.code = NOT_FOUND_ERROR_CODE;
        throw error;
      }

      if (card.owner.toString() !== userId) {
        const error = new Error();
        error.code = NO_ACCESS_ERROR_CODE;
        throw error;
      }

      return Card.findByIdAndUpdate(
        cardId,
        { $pull: { likes: userId } },
        { new: true, runValidators: true },
      );
    })
    .then((card) => res.send({ data: card }))
    .catch((error) => next(error));
};

module.exports.removeLike = (req, res, next) => {
  const { cardId } = req.params;
  const userId = req.user._id;

  return Card.findById(cardId)
    .then((card) => {
      if (!card) {
        const error = new Error();
        error.code = NOT_FOUND_ERROR_CODE;
        throw error;
      }

      if (card.owner.toString() !== userId) {
        const error = new Error();
        error.code = NO_ACCESS_ERROR_CODE;
        throw error;
      }

      return Card.findByIdAndUpdate(
        cardId,
        { $pull: { likes: userId } },
        { new: true, runValidators: true },
      );
    })
    .then((card) => res.send({ data: card }))
    .catch((error) => next(error));
};

module.exports.deleteCard = (req, res, next) => {
  const { cardId } = req.params;
  const userId = req.user._id;

  return Card.findById(cardId)
    .then((card) => {
      if (!card) {
        const error = new Error();
        error.code = NOT_FOUND_ERROR_CODE;
        throw error;
      }

      if (card.owner.toString() !== userId) {
        const error = new Error();
        error.code = NO_ACCESS_ERROR_CODE;
        throw error;
      }

      return Card.deleteOne(card).then(() => card);
    })
    .then((card) => res.send({ data: card }))
    .catch((error) => next(error));
};
