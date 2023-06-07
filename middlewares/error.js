const {
  DEFAULT_ERROR_CODE,
  NOT_CORRECT_ERROR_CODE,
  IS_EXIST_ERROR_CODE,
} = require('../utils/utils');

module.exports.errorMiddleware = (err, req, res, next) => {
  if (err.name === 'ValidationError') {
    return res.status(NOT_CORRECT_ERROR_CODE).send({ message: 'Ошибка валидации данных' }).then(() => next());
  }

  if (err.code === IS_EXIST_ERROR_CODE) {
    return res.status(IS_EXIST_ERROR_CODE).send({ message: 'Пользователь с таким email уже существует' }).then(() => next());
  }

  return res.status(DEFAULT_ERROR_CODE).send({ message: 'Внутренняя ошибка сервера' }).then(() => next());
};
