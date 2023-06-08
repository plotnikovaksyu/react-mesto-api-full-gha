const express = require('express');
require('dotenv').config();
const cors = require('cors');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const { router } = require('./routes/index');
const { defaultError } = require('./middleware/default_error');
const NotFoundError = require('./errors/notFoundError');
const { requestLogger, errorLogger } = require('./middleware/logger');
const { limiter } = require('./middleware/rate-limiter');

const app = express();
app.use(cors());

const { PORT = 3000 } = process.env;
mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

app.use(limiter);
app.use(express.json());
app.use(requestLogger);
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use('/', router);
app.all('*', (req, res, next) => {
  next(new NotFoundError('Запрашиваемая страница не существует'));
});

app.use(errorLogger);
app.use(errors());
app.use(defaultError);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
