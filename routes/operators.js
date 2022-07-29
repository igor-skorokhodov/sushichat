const operatorRoutes = require("express").Router();
const { celebrate, Joi } = require("celebrate");
const auth = require("../middlewares/auth");

const { getOperator, getOperators, updateOperator, createOperator } = require("../controllers/operators");

operatorRoutes.get("/operators", auth, getOperators);

operatorRoutes.get(
  "/operators/:operatorId",
  celebrate({
    headers: Joi.object()
      .keys({
        operatorId: Joi.string().hex().length(24),
      })
      .unknown(true),
  }),
  getOperator
);

operatorRoutes.patch(
  "/operators/me",
  celebrate({
    headers: Joi.object()
      .keys({
        operatorId: Joi.string().hex().length(24),
      })
      .unknown(true),
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      city: Joi.string().required().min(2).max(30),
      avatar: Joi.string().required(),
    }),
  }),
  updateOperator
);

operatorRoutes.post(
  "/operators/create",
  celebrate({
    body: Joi.object()
      .keys({
        name: Joi.string().required().min(2).max(30),
        city: Joi.string().required().min(2).max(30),
        avatar: Joi.string().required(),
      })
      .unknown(true),
  }),
  createOperator
);

module.exports = operatorRoutes;
