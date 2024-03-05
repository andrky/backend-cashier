// var express = require('express');
// var path = require('path');
// var cookieParser = require('cookie-parser');
// var logger = require('morgan');

// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');

import express from 'express';
import logger from 'morgan';
import dotenv from 'dotenv';

import indexRouter from './routes/index.js';

const env = dotenv.config().parsed;
var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', indexRouter);

app.listen(env.APP_PORT, () => {
	console.log(`Server running on port ${env.APP_PORT}`);
});
