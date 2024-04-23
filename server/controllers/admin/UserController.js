var UserService = require('../../services/admin/UserService')
const JWT = require("../../util/JWT")
const fs = require('fs')
var verificationCode = require('../../public/javascripts/verificationCode.js')

var UserController = {
    login:async (req,res)=>{
        let result = await UserService.login(req.body);
        let ret = {}
        if(result.length > 0){
            let { id,name,info,age,sex,avatar,role } = result[0];
            let token = JWT.generate({ name,id })
            res.header({
                Authorization: token,
                abc:'abc'
            });
            ret = {
                state : 1,
                data : { id,name,info,age,sex,avatar,role },
                msg: 'ok'
            }
        }else{
            ret = {
                state : 0,
                data : '',
                msg: 'not found'
            }
        }
        res.send(ret)
    },
    upload:async(req,res) => {
        let file = req.file;
        let queryData = req.body;
        queryData.avatar = file.destination.slice(7) + file.filename;
        queryData.__userid = req.__userid;
        let result =  await UserService.updata(queryData);
        let ret = {}
        if(result.length > 0){
            let { id,name,info,age,sex,avatar,role } = result[0];
            
            ret = {
                state : 1,
                data : { id,name,info,age,sex,avatar,role },
                msg: 'ok'
            }
        }else{
            ret = {
                state : 0,
                data : '',
                msg: 'error'
            }
        }
        res.send(ret)
    },
    uploadAvatar: async(req,res)=>{
        UserController.deleteAvatar(req,res);
        let e = req.body;
        let file = req.file;
        let queryData = req.body;
        queryData.avatar = file.destination.slice(7) + file.filename;
        queryData.__userid = req.__userid;
        let result =  await UserService.updata(queryData);
        let ret = {}
        if(result && result.changedRows > 0){
            let data =  await UserService.getUserInfoById(queryData.__userid);
            if(data && data.length > 0){
                let { id,name,info,age,sex,avatar,role } = data[0];
                ret = {
                    state : 1,
                    data : { id,name,info,age,sex,avatar,role },
                    msg: 'ok'
                }
            }
        }else{
            ret = {
                state : 0,
                data : '',
                msg: 'error'
            }
        }
        res.send(ret);
    },
    deleteAvatar: (req,res)=>{
        let avatar = req.body.avatar;
        if(!avatar) return;
        let arr = avatar.split('/');
        let filename = arr[arr.length - 1];
        fs.stat('../server/public/avataruploads/' + filename,(err,stats)=>{
            if (err) {
                console.log(err);
                return;
            } 
            if(stats.isFile()){
              fs.unlink('../server/public/avataruploads/' + filename,(error)=>{
                if(error){
                    console.log(error);
                    return;
                }
                console.log('删除文件成功');
              })
            }
        })
    },
    getCode:(req,res) => {//获取登录验证码
        verificationCode.getCode(req, res);
    }

}

module.exports = UserController