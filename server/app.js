import express from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import 'module-alias/register';

import logger from 'morgan';
import dotenv from 'dotenv';
dotenv.config();

import indexRouter from './api/v1/routes';

var app = express();
app.use(logger('dev'));
app.use(express.json());

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.json());
global.__basedir = __dirname;
app.use('', indexRouter);
module.exports = app;
