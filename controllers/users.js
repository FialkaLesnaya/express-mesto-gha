const User = require('../models/user');
const {
  DEFAULT_ERROR_CODE,
  NOT_CORRECT_ERROR_CODE,
  NOT_FOUND_ERROR_CODE,
  handleError,
} = require('../utils/utils');

const handleUserError = (res, err) => {
  if (err.name === 'ValidationError') {
    return handleError(res, NOT_CORRECT_ERROR_CODE, 'Переданы некорректные данные');
  }
  return handleError(res, DEFAULT_ERROR_CODE, 'Произошла ошибка');
};

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(() => handleError(res, DEFAULT_ERROR_CODE, 'Произошла ошибка'));
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  return User.create({ name, about, avatar }, { runValidators: true })
    .then((user) => res.send({ data: user }))
    .catch((err) => handleUserError(res, err));
};

module.exports.getUserById = (req, res) => {
  const { userId } = req.params;

  return User.findById(userId, { runValidators: true })
    .then((user) => {
      if (!user) {
        return handleError(res, NOT_FOUND_ERROR_CODE, 'Пользователь не найден');
      }
      return res.send({ data: user });
    })
    .catch((err) => handleUserError(res, err));
};

module.exports.updateUser = (req, res) => {
  const { name, about } = req.body;
  const userId = req.user._id;

  return User.findByIdAndUpdate(userId, { name, about }, { new: true, runValidators: true })
    .then((user) => res.send({ data: user }))
    .catch((err) => handleUserError(res, err));
};

module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;
  const userId = req.user._id;

  return User.findByIdAndUpdate(userId, { avatar }, { new: true, runValidators: true })
    .then((user) => res.send({ data: user }))
    .catch((err) => handleUserError(res, err));
};
