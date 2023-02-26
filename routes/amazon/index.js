const express = require('express');
const apiRouter = express.Router();

apiRouter.use('/ads', require('./ads.route'));

module.exports = apiRouter;