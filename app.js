const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { errors, celebrate } = require('celebrate');
const { errorMiddleware } = require('./middlewares/error');
const { authMiddleware } = require('./middlewares/auth');
const { validateUserBody, validateAuthentication } = require('./utils/validators');
const { PORT, DB_ADDRESS } = require('./utils/config');
const NotFoundError = require('./errors/notFoundError');

const {
  createUser,
  login,
} = require('./controllers/users');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());

// Apply the rate limiting middleware to all requests
app.use(rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
}));

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
app.use((_, __, next) => next(new NotFoundError('Недействительный путь')));
app.use(errorMiddleware);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`);
});
