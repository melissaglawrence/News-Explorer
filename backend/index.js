const express = require('express');

const PORT = process.env.PORT || 3000;

const app = express();

const mongoose = require('mongoose');

mongoose.connect(process.env.MY_MONGO_URI);

require('dotenv').config();

const cors = require('cors');

const helmet = require('helmet');

const { limiter } = require('./middleware/limiter');

const { requestLogger, errorLogger } = require('./middleware/logger');

const usersRoute = require('./routes/users');

const { signIn, signUp } = require('./controllers/users');

const articlesRoute = require('./routes/articles');

const { corsOptions } = require('./middleware/cors');

const { auth } = require('./middleware/auth');

app.use(requestLogger);

app.use(express.json());

app.use(limiter);

app.use(cors());

app.use(helmet());

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('build'));
}

app.options('*', cors());

app.post('/signIn', signIn);

app.post('/signUp', signUp);

app.use(auth);

app.use('/users', corsOptions, usersRoute);

app.use('/articles', corsOptions, articlesRoute);

app.use(errorLogger);

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  if (err.joi) {
    return res.status(400).json({
      error: err.joi.message,
    });
  }
  res.status(statusCode).send({
    message: statusCode === 500 ? 'An error occurred on the server' : message,
  });
});

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});
