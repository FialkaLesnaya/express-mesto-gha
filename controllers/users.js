const User = require("../models/user.js");

const handleError = (res, statusCode, message) => {
  res.status(statusCode).send({ message });
};

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch((err) => handleError(res, 500, err.message));
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  if (!name || !about || !avatar) {
    return handleError(res, 400, "Переданы некорректные данные");
  }

  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch((err) => handleError(res, 500, err.message));
};

module.exports.getUserById = (req, res) => {
  const userId = req.params.userId;

  User.findById(userId)
    .then((user) => {
      if (!user) {
        return handleError(res, 404, "Пользователь не найден");
      }
      res.send({ data: user });
    })
    .catch((err) => handleError(res, 500, err.message));
};

module.exports.updateUser = (req, res) => {
  const { name, about } = req.body;
  const userId = req.user._id;

  User.findByIdAndUpdate(userId, { name, about }, { new: true })
    .then((user) => {
      if (!user) {
        return handleError(res, 404, "Пользователь не найден");
      }
      res.send({ data: user });
    })
    .catch((err) => handleError(res, 500, err.message));
};

module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;
  const userId = req.user._id;

  User.findByIdAndUpdate(userId, { avatar }, { new: true })
    .then((user) => {
      if (!user) {
        return handleError(res, 404, "Пользователь не найден");
      }
      res.send({ data: user });
    })
    .catch((err) => handleError(res, 500, err.message));
};
