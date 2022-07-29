const router = require('express').Router();
const userRoutes = require('./users');
const messageRoutes = require('./messages');
const operatorRoutes = require('./operators');

router.use(userRoutes);

router.use(messageRoutes);

router.use(operatorRoutes);

module.exports = router;
