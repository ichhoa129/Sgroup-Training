require('dotenv').config();
var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var http = require('http');
var indexRouter = require('./src/routes/authors');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  return {
    status: 'error',
    statusCode: 404,
    message: 'Not found',
  }
});

// error handler
app.use(function(err, req, res, next) {
  return {
    status: 'error',
    statusCode: 500,
    message: 'An error has occurred',
  }
});


var port = process.env.PORT || '3000';
const server = app.listen(port, () => {
  console.log(`App is running at http://localhost:${port} in ${app.get('env')} mode`);
	console.log('Press CTRL-C to stop\n');
});

module.exports = server;
