const Card = require('../models/card');
const {
  CREATION_SUCCESS_CODE,
} = require('../utils/utils');
const NotFoundError = require('../errors/notFoundError');
const NotCorrectValueError = require('../errors/notCorrectValueError');
const NoAccessError = require('../errors/noAccessError');

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
        return next(new NotCorrectValueError());
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
        return next(new NotFoundError('Карточка не найдена'));
      }

      if (card.owner.toString() !== userId) {
        return next(new NoAccessError('Карточка не была создана вами'));
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
        return next(new NotFoundError('Карточка не найдена'));
      }

      if (card.owner.toString() !== userId) {
        return next(new NoAccessError('Карточка не была создана вами'));
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
        return next(new NotFoundError('Карточка не найдена'));
      }

      if (card.owner.toString() !== userId) {
        return next(new NoAccessError('Карточка не была создана вами'));
      }

      return Card.deleteOne(card).then(() => res.send({ data: card }));
    })
    .catch((error) => next(error));
};
