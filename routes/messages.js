const messageRoutes = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const auth = require('../middlewares/auth');
const {
  getMessages,
  createMessage,
  deleteMessage,
} = require('../controllers/messages');

messageRoutes.get('/messages', getMessages);

messageRoutes.post(
  '/messages',
  celebrate({
    body: Joi.object()
      .keys({
        messageText: Joi.string().required(),
        owner: Joi.string().required(),
        city: Joi.string().required(),
      })
      .unknown(true),
  }),
  createMessage,
);

messageRoutes.delete('/messages/:messageId',
  celebrate({
    params: Joi.object()
      .keys({
        messageId: Joi.string().hex().length(24),
      })
      .unknown(true),
  }), deleteMessage);

module.exports = messageRoutes;
