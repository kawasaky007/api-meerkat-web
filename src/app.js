const express = require('express');
const createError = require('http-errors');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const helmet = require('helmet');
const indexRouter = require('./routes/index');
const cors = require('cors');
const errorHandler = require('./middlewares/error');
const docsRouter = require('./routes/docs');
const http = require('http');
const axios = require('axios');
import { Router } from 'express';
import * as database from './database/mongo';
import * as cloudinary from './cloudinary.config';

const app = express();
database.connection();
const httpServer = http.createServer(app);

app.use(helmet()); // https://expressjs.com/en/advanced/best-practice-security.html#use-helmet
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());
app.use('/api/v1', indexRouter);
app.use('/docs/v1', docsRouter.default);

const router = Router();
router.post('/upload', cloudinary.uploadCloud.single('file'), (req, res, next) => {
  if (!req.file) {
    next(new Error('No file uploaded!'));
    return;
  }
  res.json({ secure_url: req.file.path, file_name: req.file.filename });
});
router.post('/upload/tmp', cloudinary.uploadTmp.single('file'), (req, res, next) => {
  if (!req.file) {
    next(new Error('No file uploaded!'));
    return;
  }
  res.json({ secure_url: req.file.path, file_name: req.file.filename });
});
router.post('/recaptcha/api/siteverify', (req, res) => {
  axios.post('https://www.google.com/recaptcha/api/siteverify',null, {
    params:{
    secret: req.body.secret,
    response: req.body.response
    }
  })
  .then(result => {
    res.json(result.data);
  })
  .catch(error => {
    console.error(error);
  });
});
app.use(router);

// const socketIo = require('socket.io')(httpServer, {
//   cors: {
//     origin: '*',
//   },
//   allowEIO3: true,
// });

httpServer.listen(8080);

// catch 404 and forward to error handler
// app.use((req, res, next) => {
//   next(createError.NotFound());
// });
// pass any errors to the error handler
app.use(errorHandler);

module.exports = app;
