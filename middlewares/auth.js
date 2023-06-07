const jwt = require('jsonwebtoken');
const {
  AUTH_ERROR_CODE,
} = require('../utils/utils');

module.exports.authMiddleware = (req, res, next) => {
  const token = req.headers.authorization || req.body.token;

  if (!token) {
    return res.status(AUTH_ERROR_CODE).send({ message: 'Отсутствует токен авторизации' });
  }

  try {
    const payload = jwt.verify(token, 'jwt');

    req.user = payload;

    return next();
  } catch (error) {
    return res.status(AUTH_ERROR_CODE).send({ message: 'Недействительный токен авторизации' });
  }
};
