const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
    default: 'Клиент',
  },
  phoneNumber: {
    type: Number,
    required: true,
    minlength: 11,
    maxlength: 11,
  }
});

module.exports = mongoose.model('User', userSchema);
