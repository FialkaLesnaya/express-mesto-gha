module.exports.errorMiddleware = (err, req, res) => {
  if (err.name === 'ValidationError') {
    return res.status(400).json({ error: 'Ошибка валидации данных' });
  }

  if (err.code === 11000) {
    return res.status(409).json({ error: 'Пользователь с таким email уже существует' });
  }

  return res.status(500).json({ error: 'Внутренняя ошибка сервера' });
};
