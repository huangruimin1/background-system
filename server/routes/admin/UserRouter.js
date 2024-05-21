var express = require('express');
var UserRouter = express.Router();
var UserController = require('../../controllers/admin/UserController')
const multer  = require('multer')
const upload = multer({ dest: 'public/avataruploads/' })

/* GET home page. */
// 登录
UserRouter.post('/user/login', UserController.login);

// 获取验证码
UserRouter.post('/user/getcode',UserController.getCode);

// 上传头像
UserRouter.post('/user/upload', upload.single('file'),UserController.upload);

UserRouter.post('/user/uploadAvatar',upload.single('file'),UserController.uploadAvatar);

UserRouter.post('/user/registerUser', UserController.registerUser);
// 按用户名查询用户
UserRouter.post('/user/selectbyname', UserController.selectUersByName);
// 查询用户名是否重复
UserRouter.post('/user/checkByName', UserController.checkByName);
// 修改用户
UserRouter.post('/user/modifyUser', UserController.modifyUser);
// 删除用户
UserRouter.post('/user/deleteUser', UserController.deleteUser);


module.exports = UserRouter;