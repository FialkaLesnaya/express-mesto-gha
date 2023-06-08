const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../utils/config');
const {
  AUTH_ERROR_CODE,
} = require('../utils/utils');

module.exports.authMiddleware = (req, res, next) => {
  let token = req.headers.authorization || req.body.token || req.cookies.token;

  if (!token) {
    const error = new Error();
    error.code = AUTH_ERROR_CODE;
    return next(error);
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
    error.code = AUTH_ERROR_CODE;
    return next(error);
  }
};
