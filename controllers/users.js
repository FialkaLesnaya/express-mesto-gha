const User = require('../models/user');
const {
  DEFAULT_ERROR_CODE,
  NOT_CORRECT_ERROR_CODE,
  NOT_FOUND_ERROR_CODE,
  handleError,
  isValidId,
} = require('../utils/utils');

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(() => handleError(res, DEFAULT_ERROR_CODE, 'Произошла ошибка'));
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  if (
    !name
    || name.length < 2
    || name.length > 30
    || !about
    || about.length < 2
    || about.length > 30
    || !avatar
  ) {
    return handleError(
      res,
      NOT_CORRECT_ERROR_CODE,
      'Переданы некорректные данные',
    );
  }

  return User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch(() => handleError(res, DEFAULT_ERROR_CODE, 'Произошла ошибка'));
};

module.exports.getUserById = (req, res) => {
  const { userId } = req.params;

  if (!isValidId(userId)) {
    return handleError(res, NOT_CORRECT_ERROR_CODE, 'Пользователь не найден');
  }

  return User.findById(userId)
    .then((user) => {
      if (!user) {
        return handleError(res, NOT_FOUND_ERROR_CODE, 'Пользователь не найден');
      }
      return res.send({ data: user });
    })
    .catch(() => handleError(res, DEFAULT_ERROR_CODE, 'Произошла ошибка'));
};

module.exports.updateUser = (req, res) => {
  const { name, about } = req.body;
  const userId = req.user._id;

  if (
    (name && (name.length < 2 || name.length > 30))
    || (about && (about.length < 2 || about.length > 30))
    || !isValidId(userId)
  ) {
    return handleError(
      res,
      NOT_CORRECT_ERROR_CODE,
      'Переданы некорректные данные',
    );
  }

  return User.findByIdAndUpdate(userId, { name, about }, { new: true })
    .then((user) => res.send({ data: user }))
    .catch(() => handleError(res, DEFAULT_ERROR_CODE, 'Произошла ошибка'));
};

module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;
  const userId = req.user._id;
  if (!isValidId(userId)) {
    return handleError(res, NOT_FOUND_ERROR_CODE, 'Пользователь не найден');
  }

  return User.findByIdAndUpdate(userId, { avatar }, { new: true })
    .then((user) => res.send({ data: user }))
    .catch(() => handleError(res, DEFAULT_ERROR_CODE, 'Произошла ошибка'));
};
