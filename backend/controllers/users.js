const User = require('../models/users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const { NODE_ENV, JWT_SECRET } = process.env;

const {
  RequestError,
  AuthError,
  ForbiddenError,
  NotFoundError,
  ConflictError,
} = require('../middleware/error');

const signIn = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      if (!email || !password) {
        console.log('Missing Required fields');
      } else if (!user) {
        console.log('User not found');
      }

      const token = jwt.sign(
        { _id: user._id },
        process.env.NODE_ENV === 'production'
          ? process.env.JWT_SECRET
          : 'dev-secret',
        {
          expiresIn: '7d',
        }
      );
      return res.send({ token });
    })
    .catch(next);
};

const signUp = (req, res, next) => {
  const { username, email, password } = req.body;
  User.findOne({ email: email })
    .then((user) => {
      if (user) {
        throw new ConflictError('User already exists');
      }
    })
    .catch(next);
  bcrypt
    .hash(password, 10)
    .then((hash) => {
      User.create({ username, email, password: hash }).then((user) => {
        res.status(201).send({ _id: user._id });
      });
    })
    .catch(next);
};

const getUser = (req, res, next) => {
  User.findById({ _id: req.user._id })
    .then((user) => {
      if (!user) {
        throw new NotFoundError('No user with matching ID found');
      }
      res.status(200).send({ user });
    })
    .catch(next);
};

const getUsersInfo = (req, res, next) => {
  User.find({})
    .orFail(() => {
      throw new NotFoundError('User not found');
    })
    .then((user) => {
      if (!user) {
        throw new AuthError('Not authorized');
      }
      res.status(200).send({ user });
    })
    .catch(next);
};

module.exports = { getUser, getUsersInfo, signIn, signUp };
