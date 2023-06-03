const bcrypt = require('bcryptjs'); // импортируем bcrypt
const User = require('../models/user');
const {
  DEFAULT_ERROR_CODE,
  NOT_CORRECT_ERROR_CODE,
  NOT_FOUND_ERROR_CODE,
  handleError,
  isValidId,
} = require('../utils/utils');

const handleUserError = (res, err, id) => {
  if (err.name === 'ValidationError' || (id != null && !isValidId(id))) {
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
  const {
    name,
    about,
    avatar,
    email,
    password,
  } = req.body;

  return bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    }))
    .then((user) => res.send({ data: user }))
    .catch((err) => handleUserError(res, err));
};

module.exports.getUserById = (req, res) => {
  const { userId } = req.params;

  return User.findById(userId)
    .then((user) => {
      if (!user) {
        return handleError(res, NOT_FOUND_ERROR_CODE, 'Пользователь не найден');
      }
      return res.send({ data: user });
    })
    .catch((err) => handleUserError(res, err, userId));
};

module.exports.updateUser = (req, res) => {
  const { name, about } = req.body;
  const userId = req.user._id;

  return User.findByIdAndUpdate(userId, { name, about }, { new: true, runValidators: true })
    .then((user) => res.send({ data: user }))
    .catch((err) => handleUserError(res, err, userId));
};

module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;
  const userId = req.user._id;

  return User.findByIdAndUpdate(userId, { avatar }, { new: true, runValidators: true })
    .then((user) => res.send({ data: user }))
    .catch((err) => handleUserError(res, err, userId));
};

module.exports.login = (req, res) => {
  const { email, password } = req.body;

  return User.findOne({ email })
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error('Неправильные почта или пароль'));
      }

      return bcrypt.compare(password, user.password);
    })
    .then((matched) => {
      if (!matched) {
        return Promise.reject(new Error('Неправильные почта или пароль'));
      }

      return res
        .cookie('jwt', {
          _id: '646e8c25df6918733922ab22',
        }, {
          maxAge: 3600000 * 24 * 7,
          httpOnly: true,
        })
        .end();
    })
    .catch((err) => handleUserError(res, err));
};
