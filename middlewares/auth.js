const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../utils/config');
const {
  AUTH_ERROR_CODE,
} = require('../utils/utils');

module.exports.authMiddleware = (req, res, next) => {
  let token = req.headers.authorization || req.body.token || req.cookies.token;

  if (!token) {
    return res.status(AUTH_ERROR_CODE).send({ message: 'Отсутствует токен авторизации' });
  }

  if (token.startsWith('Bearer ')) {
    token = token.slice(7);
  }

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.headers.authorization = token;
    req.user = payload;

    return next();
  } catch (error) {
    return res.status(AUTH_ERROR_CODE).send({ message: 'Недействительный токен авторизации' });
  }
};
