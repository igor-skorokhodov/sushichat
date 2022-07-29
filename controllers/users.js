/* eslint-disable no-underscore-dangle */
const User = require('../models/user');
const NotFoundError = require('../errors/not-found-err');
const ReqError = require('../errors/req-error');
const ConflictError = require('../errors/conflict-error');

function getUsers(req, res, next) {
  return User.find({})
    .then((users) => {
      res.status(200).send(users);
    })
    .catch(next);
}

function getUser(req, res, next) {
  const id = req.headers.userId;

  return User.findById(id)
    .orFail(new NotFoundError('Клиент не найден'))
    .then((user) => {
      res.status(200).send({ user });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new ReqError('неверно написан ID клиента'));
      } else {
        next(err);
      }
    });
}

function createUser(req, res, next) {
  const { name, phoneNumber } = req.body;

  if (!phoneNumber || !name) {
    throw new ReqError('Имя или телефонный номер не могут быть пустыми');
  }

  User.findOne({ phoneNumber })
    .then((user) => {
      if (user) {
        throw new ConflictError('Такой клиент уже существует');
      }
    })
    .catch(next);

  User.create({
      name: req.body.name,
      phoneNumber: req.body.phoneNumber,
    })
    .then((user) => {
      res.status(200).send({ user });
    })
    .catch(next);
}

function updateUser(req, res, next) {
  const id = req.headers.userId;

  return User.findByIdAndUpdate(
    id,
    {
      name: req.body.name,
      phoneNumber: req.body.phoneNumber,
    },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => {
      res.status(200).send({ user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ReqError('ошибка валидации'));
      } else {
        next(err);
      }
    });
}


module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
};
