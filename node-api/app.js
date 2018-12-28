const express = require('express');
const logger = require('morgan');

const healthCheckRouter = require('./routes/healthcheck');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/healthcheck', healthCheckRouter);

module.exports = app;
