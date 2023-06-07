const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const {
  NOT_FOUND_ERROR_CODE,
  IS_EXIST_ERROR_CODE,
  AUTH_ERROR_CODE,
} = require('../utils/utils');
const { JWT_SECRET } = require('../utils/config');

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
      const error = new Error();
      error.code = IS_EXIST_ERROR_CODE;
      throw error;
    }

    return bcrypt.hash(password, 10)
      .then((hash) => User.create({
        name,
        about,
        avatar,
        email,
        password: hash,
      }))
      .then((user) => res.send({
        _id: user._id,
        name: user.name,
        about: user.about,
        avatar: user.avatar,
        email: user.email,
      }));
  }).catch((error) => next(error));
};

module.exports.getUserById = (req, res, next) => {
  const { userId } = req.params;

  return User.findById(userId)
    .then((user) => {
      if (!user) {
        const error = new Error();
        error.code = NOT_FOUND_ERROR_CODE;
        throw error;
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
        const error = new Error();
        error.code = AUTH_ERROR_CODE;
        throw error;
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            const error = new Error();
            error.code = AUTH_ERROR_CODE;
            throw error;
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
        const error = new Error();
        error.code = NOT_FOUND_ERROR_CODE;
        throw error;
      }
      return res.send({ data: user });
    })
    .catch((error) => next(error));
};
