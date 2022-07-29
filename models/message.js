const mongoose = require('mongoose');
const validator = require('validator');
const ObjectId = require('mongodb').ObjectID;

const messageSchema = new mongoose.Schema({
  messageText: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  owner: {
    type: ObjectId,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Message', messageSchema);
