const jwt = require('jsonwebtoken');

module.exports.authMiddleware = (req, res, next) => {
  const token = req.headers.authorization;

  // if (!token) {
  //   return res.status(401).send({ message: 'Отсутствует токен авторизации' });
  // }

  try {
    const payload = jwt.verify(token, 'jwt');

    req.user = payload;

    return next();
  } catch (error) {
    return res.status(401).send({ message: 'Недействительный токен авторизации' });
  }
};
