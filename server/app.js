var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var loginRouter = require('./routes/login');
var checkTokenRouter = require('./routes/checkToken');
var uploadRouter = require('./routes/upload');

var app = express();

var bodyparser = require('body-parser');
app.use(bodyparser.urlencoded({extende:true}));
app.use(express.static('./public'))
app.use(bodyparser.json())

app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  //Access-Control-Allow-Headers ,可根据浏览器的F12查看,把对应的粘贴在这里就行
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Methods', '*');
  res.header('Content-Type', 'application/json;charset=utf-8');
  next();
});

// const token = require('./routes/token.js');
// const jwtDecode = require('jwt-decode');

// let tokenNum = token.createToken("大地瓜","7","days") + '0'
// let tokenParse = jwtDecode(tokenNum);

// console.log("加密: ", tokenNum)
// console.log("解析： ", tokenParse)
// console.log("验证： ", token.verifyToken(tokenNum))

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// 生成随机id
const uuid = require('node-uuid');
const creatuuid= uuid.v1()

// 路由
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/login', loginRouter);
app.use('/checkToken', checkTokenRouter);
app.use('/upload', uploadRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
