const {
  DEFAULT_ERROR_CODE,
  NOT_CORRECT_VALUE_ERROR_CODE,
  AUTH_ERROR_CODE,
  NO_ACCESS_ERROR_CODE,
  NOT_FOUND_ERROR_CODE,
  IS_EXIST_ERROR_CODE,
} = require('../utils/utils');

module.exports.errorMiddleware = (err, _, res, next) => {
  if (err.name === 'ValidationError' || err.name === 'CastError' || err.code === NOT_CORRECT_VALUE_ERROR_CODE) {
    return res.status(NOT_CORRECT_VALUE_ERROR_CODE).send({ message: 'Ошибка валидации данных' }).then(() => next());
  }

  if (err.code === AUTH_ERROR_CODE) {
    return res.status(AUTH_ERROR_CODE).send({ message: 'Пользователь с таким email уже существует' }).then(() => next());
  }

  if (err.code === IS_EXIST_ERROR_CODE) {
    return res.status(IS_EXIST_ERROR_CODE).send({ message: 'По указанным данным уже существует пользователь' }).then(() => next());
  }

  if (err.code === NO_ACCESS_ERROR_CODE) {
    return res.status(NO_ACCESS_ERROR_CODE).send({ message: 'Нет доступа' }).then(() => next());
  }

  if (err.code === NOT_FOUND_ERROR_CODE) {
    return res.status(NOT_FOUND_ERROR_CODE).send({ message: 'Не найдено' }).then(() => next());
  }

  return res.status(DEFAULT_ERROR_CODE).send({ message: 'Внутренняя ошибка сервера' }).then(() => next());
};
