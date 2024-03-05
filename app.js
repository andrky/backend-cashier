// var express = require('express');
// var path = require('path');
// var cookieParser = require('cookie-parser');
// var logger = require('morgan');

// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');

// Import library
// dotenv untuk koneksi dengan semua yang berhubungan dengan .env
// mongoose untuk koneksi dengan database mongodb
import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import indexRouter from './routes/index.js';
import { store } from './controllers/CategoryController.js';

const env = dotenv.config().parsed;
var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', indexRouter);
app.post('/categories', store);

// Koneksi ke database mongodb
mongoose.connect(`${env.MONGODB_URI}${env.MONGODB_HOST}:${env.MONGODB_PORT}/`, {
	dbName: env.MONGODB_DB_NAME,
});
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', function () {
	console.log('Connected to MongoDB');
});

app.listen(env.APP_PORT, () => {
	console.log(`Server running on port ${env.APP_PORT}`);
});
