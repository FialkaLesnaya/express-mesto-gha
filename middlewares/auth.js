const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../utils/config');
const {
  AUTH_ERROR_CODE,
} = require('../utils/utils');

module.exports.authMiddleware = (req, res, next) => {
  const token = req.headers.authorization || req.body.token || req.cookies.token;

  if (!token) {
    return res.status(AUTH_ERROR_CODE).send({ message: 'Отсутствует токен авторизации' });
  }

  try {
    // console.log('token', token);
    const payload = jwt.verify(token, JWT_SECRET);
    // console.log('token2', token);
    req.headers.authorization = token;
    req.user = payload;

    return next();
  } catch (error) {
    return res.status(AUTH_ERROR_CODE).send({ message: `Недействительный токен авторизации // ${req.headers.authorization} или ${req.body.token} или ${req.cookies.token}` });
  }
};
