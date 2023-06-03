module.exports.errorMiddleware = (err, req, res, next) => {
  if (err.name === 'ValidationError') {
    return res.status(400).send({ message: 'Ошибка валидации данных' }).then(() => next());
  }

  if (err.code === 11000) {
    return res.status(409).send({ message: 'Пользователь с таким email уже существует' }).then(() => next());
  }

  return res.status(500).send({ message: 'Внутренняя ошибка сервера' }).then(() => next());
};
