const Message = require('../models/message');
const ReqError = require('../errors/req-error');
const ForbiddenError = require('../errors/forb-error');
const NotFoundError = require('../errors/not-found-err');

function getMessages(req, res, next) {
  return Message.find({})
    .then((messages) => res.status(200).send(messages))
    .catch(next);
}

function createMessage(req, res, next) {
  return Message.create({ ...req.body })
    .then((message) => {
      res.status(200).send(message);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ReqError('ошибка валидации'));
      } else {
        next(err);
      }
    });
}

function deleteMessage(req, res, next) {
  const id = req.params.messageId;
  const userId = req.user._id;

  return Message.findById(id)
    .orFail(new NotFoundError('Сообщение не найдено'))
    .then((message) => {
      if (message.owner.toString() === userId) {
        return Card.findByIdAndRemove(id)
          .orFail(new ReqError('Сообщение не найдено'))
          .then((data) => {
            res.status(200).send({ data });
          })
          .catch((err) => {
            if (err.name === 'CastError') {
              next(new ReqError('Сообщение не найдено'));
            } else {
              next(err);
            }
          });
      }
      return next(new ForbiddenError('Нет прав на удаление сообщения'));
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new ReqError('Сообщение не найдено'));
      } else {
        next(err);
      }
    });
}

module.exports = {
  getMessages,
  createMessage,
  deleteMessage,
};
