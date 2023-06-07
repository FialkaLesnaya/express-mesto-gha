const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { errors, celebrate } = require('celebrate');
const { NOT_FOUND_ERROR_CODE } = require('./utils/utils');
const { errorMiddleware } = require('./middlewares/error');
const { authMiddleware } = require('./middlewares/auth');
const { validateUserBody, validateAuthentication } = require('./utils/validators');
const { PORT, DB_ADDRESS } = require('./utils/config');

const {
  createUser,
  login,
} = require('./controllers/users');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(DB_ADDRESS, {
  useNewUrlParser: true,
});

app.use(cookieParser());
app.post('/signin', celebrate({ body: validateAuthentication }), login);
app.post('/signup', celebrate({ body: validateUserBody }), createUser);
app.use(authMiddleware);
app.use('/users', require('./routes/users'));
app.use('/cards', require('./routes/cards'));

app.use(errors());
app.use(errorMiddleware);

app.use((_, res) => {
  res.status(NOT_FOUND_ERROR_CODE).send({ message: 'Путь неизвестен' });
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`);
});
