var http = require('http');
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var JWT = require('./util/JWT.js')

var usersRouter = require('./routes/admin/UserRouter');
// var webRouter = require('./routes/web/webRouter');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// 路由拦截中间件
app.use(function(req, res, next) {
  if(req.url == '/adminapi/user/login'){
    next();
    return;
  }
  var token = req.headers.authorization.split(' ')[1];
  var jwtres = JWT.verify(token);
  if(!jwtres){
    res.status(401).send({msg:'token 过期需重新登录'});
    return;
  }else{
    token = JWT.generate({
        name: jwtres.name,
        id: jwtres.id
    })
    res.header({
        Authorization: token
    });
    req.__userid = jwtres.id;
  }
  next();
});

app.use('/adminapi', usersRouter);

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

var server = http.createServer(app);
// module.exports = app;
server.listen(9000,()=>{
  console.log('服务启动了... ...');
})