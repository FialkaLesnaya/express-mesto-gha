const User = require("../models/user.js");

const DEFAULT_ERROR_CODE = 500;
const NOT_CORRECT_ERROR_CODE = 400;
const NOT_FOUND_ERROR_CODE = 404;

const handleError = (res, statusCode, message) => {
  res.status(statusCode).send({ message });
};

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch((err) => handleError(res, DEFAULT_ERROR_CODE, err.message));
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  if (
    !name ||
    name.length < 2 ||
    name.length > 30 ||
    !about ||
    about.length < 2 ||
    about.length > 30 ||
    !avatar
  ) {
    return handleError(
      res,
      NOT_CORRECT_ERROR_CODE,
      "Переданы некорректные данные"
    );
  }

  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch((err) => handleError(res, DEFAULT_ERROR_CODE, err.message));
};

module.exports.getUserById = (req, res) => {
  const userId = req.params.userId;

  User.findById(userId)
    .then((user) => {
      if (!user) {
        return handleError(res, NOT_FOUND_ERROR_CODE, "Пользователь не найден");
      }
      res.send({ data: user });
    })
    .catch((err) => handleError(res, DEFAULT_ERROR_CODE, err.message));
};

module.exports.updateUser = (req, res) => {
  const { name, about } = req.body;
  const userId = req.user._id;

  if (
    (name && (name.length < 2 || name.length > 30)) ||
    (about && (about.length < 2 || about.length > 30))
  ) {
    return handleError(
      res,
      NOT_CORRECT_ERROR_CODE,
      "Переданы некорректные данные"
    );
  }

  User.findByIdAndUpdate(userId, { name, about }, { new: true })
    .then((user) => {
      if (!user) {
        return handleError(res, NOT_FOUND_ERROR_CODE, "Пользователь не найден");
      }
      res.send({ data: user });
    })
    .catch((err) => handleError(res, DEFAULT_ERROR_CODE, err.message));
};

module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;
  const userId = req.user._id;

  User.findByIdAndUpdate(userId, { avatar }, { new: true })
    .then((user) => {
      if (!user) {
        return handleError(res, NOT_FOUND_ERROR_CODE, "Пользователь не найден");
      }
      res.send({ data: user });
    })
    .catch((err) => handleError(res, DEFAULT_ERROR_CODE, err.message));
};
