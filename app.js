const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors, celebrate } = require('celebrate');
const { NOT_FOUND_ERROR_CODE, handleError } = require('./utils/utils');
const { errorMiddleware } = require('./middlewares/error');
const { authMiddleware } = require('./middlewares/auth');
const { validateUserBody, validateAuthentication } = require('./utils/validators');

const {
  createUser,
  login,
} = require('./controllers/users');

const PORT = 3000;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://127.0.0.1/mestodb', {
  useNewUrlParser: true,
});

app.post('/signin', celebrate({ body: validateAuthentication }), login);
app.post('/signup', celebrate({ body: validateUserBody }), createUser);
app.use(authMiddleware);
app.use('/users', require('./routes/users'));
app.use('/cards', require('./routes/cards'));

app.use(errors());
app.use(errorMiddleware);

app.use((req, res) => {
  handleError(res, NOT_FOUND_ERROR_CODE, 'Путь неизвестен');
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`);
});
