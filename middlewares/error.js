module.exports.errorMiddleware = (err, req, res, next) => {
  if (err.name === 'ValidationError') {
    return res.status(400).send({ error: 'Ошибка валидации данных' });
  }

  if (err.code === 11000) {
    return res.status(409).send({ error: 'Пользователь с таким email уже существует' });
  }

  return res.status(500).send({ error: 'Внутренняя ошибка сервера' });
};
