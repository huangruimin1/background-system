var express = require('express');
var UserRouter = express.Router();
var UserController = require('../../controllers/admin/UserController')
const multer  = require('multer')
const upload = multer({ dest: 'public/avataruploads/' })

/* GET home page. */
// 登录
UserRouter.post('/user/login', UserController.login);


UserRouter.post('/user/getcode',UserController.getCode);

// 上传头像
UserRouter.post('/user/upload', upload.single('file'),UserController.upload);

UserRouter.post('/user/uploadAvatar',upload.single('file'),UserController.uploadAvatar);

UserRouter.get('/user/home', (res,resp)=>{
    resp.send('ok')
});



module.exports = UserRouter;