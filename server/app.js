var http = require('http');
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var logger = require('morgan');
var JWT = require('./util/JWT.js')
const session = require('express-session');
var cookieParser = require('cookie-parser');
// const cors = require('cors')


var usersRouter = require('./routes/admin/UserRouter');
// var webRouter = require('./routes/web/webRouter');
var app = express();

// view engine setup
app.set('trust proxy', 1) // 信任代理
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(cookieParser());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.use(express.static(path.join(__dirname, 'public')));

// //设置跨域访问
app.all('*', function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, No-Cache, X-Requested-With, If-Modified-Since, Pragma, Last-Modified, Cache-Control, Expires, Content-Type, X-E4M-With, Authorization, verCode");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("Access-Control-Expose-Headers", "Authorization", "verCode");
  res.header("X-Powered-By", ' 3.2.1')
  res.header("Content-Type", "application/json;charset=utf-8");
  next();
});

// app.use(cors({
//   credentials: true, // 允许发送cookies
//   // origin: 'http://localhost:5173/.com' // 客户端请求的域名
// }));
// 路由拦截中间件
app.use(function (req, res, next) {
  console.log(req.headers)
  if (req.url == '/adminapi/user/login' || req.url == '/adminapi/user/getcode') {
    next();
  } else {
    var str = req.headers.authorization + '';
    var token = str.split(' ')[1];
    var jwtres = JWT.verify(token);
    console.log(jwtres)
    if (!jwtres) {
      res.status(401).send({ msg: 'token 过期需重新登录' });
    } else {
      token = JWT.generate({
        name: jwtres.name,
        id: jwtres.id + ""
      })
      res.header({
        Authorization: token
      });
      req.__userid = jwtres.id;
      next();
    }
  }
});
// 配置session
/**
 * session
 *  secret：  一个 String 类型的字符串，作为服务器端生成 session 的签名
 *  name:    保存在本地cookie的一个名字 默认connect.sid  可以不设置
 *  resave:  强制保存 session 即使它并没有变化,。默认为 true。建议设置成 false。
 *  rolling: 在每次请求时强行设置 cookie，这将重置 cookie 过期时间（默认：false）
 *  saveUninitialized: 强制将未初始化的 session 存储。默认值是true,建议设置成true
 *
 * cookie
 *  属性默认值: { path: '/', httpOnly: true, secure: false, maxAge: null }
 *  httpOnly： 属性禁止客户端JavaScript的访问，禁止后不能使用document.cookie
 *  secure:    https这样的情况才可以访问cookie
 *  maxAge：   单位毫秒，从设置cookie开始多少毫秒失效(如果maxAge和expires都设置了，最后设置的属性生效.)
 *  path：     路径，默认值为域名的根路径
 *  sameSite:  SameSite-cookies是一种机制，用于定义cookie如何跨域发送。
 */
app.use(session({
  secret: 'huangruimin',
  // name: connect.sid,
  resave: true,
  rolling: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: false,
    maxAge: 180000
  }
}));
app.use('/adminapi', usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

var server = http.createServer(app);
// module.exports = app;
server.listen(9000, () => {
  console.log('服务启动了... ...');
})