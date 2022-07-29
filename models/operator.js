const mongoose = require('mongoose');
const validator = require('validator');

const operatorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
    default: 'Operator',
  },
  city: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
    default: 'Barnaul',
  },
  avatar: {
    type: String,
    required: true,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    validate: {
      validator(avatar) {
        return validator.isURL(avatar);
      },
      message: (props) => `${props.value} некорректный url`,
    },
  }
});

module.exports = mongoose.model('Operator', operatorSchema);
