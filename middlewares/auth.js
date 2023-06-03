const jwt = require('jsonwebtoken');

function authMiddleware(req, res, next) {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: 'Отсутствует токен авторизации' });
  }

  try {
    const payload = jwt.verify(token, 'jwt');

    req.user = payload;

    next();
  } catch (error) {
    return res.status(401).json({ error: 'Недействительный токен авторизации' });
  }
}
