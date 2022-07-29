/* eslint-disable no-underscore-dangle */
const Operator = require("../models/operator");
const NotFoundError = require("../errors/not-found-err");
const ReqError = require("../errors/req-error");
const ConflictError = require("../errors/conflict-error");

function getOperators(req, res, next) {
  return Operator.find({})
    .then((operators) => {
      res.status(200).send(operators);
    })
    .catch(next);
}

function getOperator(req, res, next) {
  const id = req.headers.operatorId;

  return Operator.findById(id)
    .orFail(new NotFoundError("Оператор не найден"))
    .then((operator) => {
      res.status(200).send({ operator });
    })
    .catch((err) => {
      if (err.name === "CastError") {
        next(new ReqError("неверно написан ID опеартора"));
      } else {
        next(err);
      }
    });
}

function createOperator(req, res, next) {
  const { name, city } = req.body;

  if (!city || !name) {
    throw new ReqError("Имя или город не могут быть пустыми");
  }

  Operator.findOne({ name })
    .then((operator) => {
      if (operator) {
        throw new ConflictError("Такой оператор уже существует");
      }
    })
    .catch(next);

  Operator.create({
    name: req.body.name,
    city: req.body.city,
    avatar: req.body.avatar,
  })
    .then((operator) => {
      res.status(200).send({ operator });
    })
    .catch(next);
}

function updateOperator(req, res, next) {
  const id = req.headers.operatorId;

  return Operator.findByIdAndUpdate(
    id,
    {
      name: req.body.name,
      city: req.body.city,
      avatar: req.body.avatar,
    },
    {
      new: true,
      runValidators: true,
    }
  )
    .then((operator) => {
      res.status(200).send({ operator });
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        next(new ReqError("ошибка валидации"));
      } else {
        next(err);
      }
    });
}

module.exports = {
  getOperators,
  getOperator,
  createOperator,
  updateOperator,
};
