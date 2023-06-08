const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const {
  CREATION_SUCCESS_CODE,
} = require('../utils/utils');
const { JWT_SECRET } = require('../utils/config');
const NotFoundError = require('../errors/notFoundError');
const IsExistError = require('../errors/isExistError');
const NotCorrectValueError = require('../errors/notCorrectValueError');
const AuthError = require('../errors/authError');

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch((error) => next(error));
};

module.exports.createUser = (req, res, next) => {
  const {
    name,
    about,
    avatar,
    email,
    password,
  } = req.body;

  return User.findOne({ email }).then((existingUser) => {
    if (existingUser) {
      return next(new IsExistError());
    }

    return bcrypt.hash(password, 10)
      .then((hash) => User.create({
        name,
        about,
        avatar,
        email,
        password: hash,
      }))
      .then((user) => res.status(CREATION_SUCCESS_CODE).send({
        _id: user._id,
        name: user.name,
        about: user.about,
        avatar: user.avatar,
        email: user.email,
      }));
  })
    .catch((error) => {
      if (error.name === 'ValidationError') {
        return next(new NotCorrectValueError());
      }

      return next(error);
    });
};

module.exports.getUserById = (req, res, next) => {
  const { userId } = req.params;

  return User.findById(userId)
    .then((user) => {
      if (!user) {
        return next(new NotFoundError('Пользователя не существует'));
      }
      return res.send({ data: user });
    })
    .catch((error) => next(error));
};

module.exports.updateUser = (req, res, next) => {
  const { name, about } = req.body;
  const userId = req.user._id;

  return User.findByIdAndUpdate(userId, { name, about }, { new: true, runValidators: true })
    .then((user) => res.send({ data: user }))
    .catch((error) => next(error));
};

module.exports.updateAvatar = (req, res, next) => {
  const { avatar } = req.body;
  const userId = req.user._id;

  return User.findByIdAndUpdate(userId, { avatar }, { new: true, runValidators: true })
    .then((user) => res.send({ data: user }))
    .catch((error) => next(error));
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        return next(new AuthError('Не верно указан логин или пароль'));
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return next(new AuthError('Не верно указан логин или пароль'));
          }
          const token = jwt.sign(
            { _id: user._id },
            JWT_SECRET,
            { expiresIn: '7d' },
          );

          res.body = { token };

          return res.send({ token });
        });
    })
    .catch((error) => next(error));
};

module.exports.getUsersMe = (req, res, next) => {
  const userId = req.user._id;

  return User.findById(userId)
    .then((user) => {
      if (!user) {
        return next(new NotFoundError('Пользователя не существует'));
      }
      return res.send({ data: user });
    })
    .catch((error) => next(error));
};
