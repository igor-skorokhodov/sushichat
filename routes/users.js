const userRoutes = require("express").Router();
const { celebrate, Joi } = require("celebrate");
const auth = require("../middlewares/auth");
const method = require("../errors/validation-error");

const { getUser, getUsers, updateUser, createUser } = require("../controllers/users");

userRoutes.get("/users", auth, getUsers);

userRoutes.get(
  "/users/:userId",
  celebrate({
    headers: Joi.object()
      .keys({
        userid: Joi.string().hex().length(24),
      })
      .unknown(true),
  }),
  getUser
);

userRoutes.patch(
  "/users/me",
  celebrate({
    headers: Joi.object()
      .keys({
        userid: Joi.string().hex().length(24),
      })
      .unknown(true),
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      phoneNumber: Joi.string().required().min(11).max(11),
    }),
  }),
  updateUser
);

userRoutes.post(
  "/users/create",
  celebrate({
    body: Joi.object()
      .keys({
        name: Joi.string().required().min(2).max(30),
        phoneNumber: Joi.string().required().min(11).max(11),
      })
      .unknown(true),
  }),
  createUser
);

module.exports = userRoutes;
