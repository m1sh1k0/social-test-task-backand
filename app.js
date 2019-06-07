var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require('./routes/index');
var app = express();
var dbConnection = require('./db/connectionDB')
var postRouter = require('./routes/post')
var bodyParser = require('body-parser');
var authRouter = require('./routes/auth')
var coockieParser = require('cookie-parser');

// DB 
app.connect(dbConnection)

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//  trigger routes
app.use('/', indexRouter);
app.post('/signup', authRouter);
app.post('/signin', authRouter);
app.post('/post', postRouter)
app.use(cookieParser())
app.use(bodyParser.json())
app.get('/signout', authRouter)
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
// no logged in eer
  app.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
      res.status(401).send('invalid token...');
    }
  });

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
