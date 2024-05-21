var UserService = require('../../services/admin/UserService')
const JWT = require("../../util/JWT")
const fs = require('fs')
var verificationCode = require('../../public/javascripts/verificationCode.js')

var UserController = {
    login: async (req, res) => {
        console.log('可以进来')
        let verCode = req.session.verCode;
        let queryData = req.body;
        // 验证码
        let userVerCode = queryData.validateCode.toLowerCase();
        if (!(userVerCode == verCode)) {//验证码不正确
            res.status(211).send({
                msg: '验证码不正确'
            })
            return;
        }

        let result = await UserService.login(queryData);
        let ret = {}
        if (result.length > 0) {
            let { id, name, info, age, sex, avatar, usertype } = result[0];
            let token = JWT.generate({ name, id })
            res.header({
                Authorization: token,
                abc: 'abc'
            });
            ret = {
                state: 1,
                data: { id, name, info, age, sex, avatar, usertype },
                msg: 'ok'
            }
        } else {
            ret = {
                state: 0,
                data: '',
                msg: 'not found'
            }
        }
        res.send(ret)
    },
    upload: async (req, res) => {
        let file = req.file;
        let queryData = req.body;
        queryData.avatar = file.destination.slice(7) + file.filename;
        queryData.__userid = req.__userid;
        let result = await UserService.updata(queryData);
        let ret = {}
        if (result.length > 0) {
            let { id, name, info, age, sex, avatar, usertype } = result[0];

            ret = {
                state: 1,
                data: { id, name, info, age, sex, avatar, usertype },
                msg: 'ok'
            }
        } else {
            ret = {
                state: 0,
                data: '',
                msg: 'error'
            }
        }
        res.send(ret)
    },
    uploadAvatar: async (req, res) => {
        if (req.file) {
            // 文件上传成功
            UserController.deleteAvatar(req, res);
            let e = req.body;
            let file = req.file;
            let queryData = req.body;
            queryData.avatar = file.destination.slice(7) + file.filename;
            queryData.__userid = req.__userid;
            let result = await UserService.updata(queryData);
            let ret = {}
            if (result && result.changedRows > 0) {
                let data = await UserService.getUserInfoById(queryData.__userid);
                if (data && data.length > 0) {
                    let { id, name, info, age, sex, avatar, usertype } = data[0];
                    ret = {
                        state: 1,
                        data: { id, name, info, age, sex, avatar, usertype },
                        msg: 'ok'
                    }
                }
            } else {
                ret = {
                    state: 0,
                    data: '',
                    msg: 'error'
                }
            }
            res.send(ret);
        } else if (req.err) {
            // 处理错误
            res.send('文件上传失败');
        }

    },
    deleteAvatar: (req, res) => {
        let avatar = req.body.avatar;
        if (!avatar) return;
        let arr = avatar.split('/');
        let filename = arr[arr.length - 1];
        fs.stat('../server/public/avataruploads/' + filename, (err, stats) => {
            if (err) {
                console.log(err);
                return;
            }
            if (stats.isFile()) {
                fs.unlink('../server/public/avataruploads/' + filename, (error) => {
                    if (error) {
                        console.log(error);
                        return;
                    }
                    console.log('删除文件成功');
                })
            }
        })
    },
    getCode: (req, res) => {//获取登录验证码
        verificationCode.getCode(req, res);
    },
    registerUser: async (req, res) => {
        let { username = '', password = '', pone = '', addr = '', name = '', age = 0, sex = 0, avatar = '', usertype = '' } = req.body;
        console.log(req.body)
        if (!username || !password) {
            return res.send('账号或者密码是空的')
        }

        try {
            // 重名？
            let userlist = await UserController.selectUersByName(req, res);
            if (userlist.length > 0) {
                res.send({
                    state: 0,
                    data: '',
                    msg: '该用户名已存在'
                })
            } else {
                let result = await UserService.registerUser({ username, password, pone, addr, name, age, sex, avatar, usertype })
                res.send({
                    state: 1,
                    data: '',
                    msg: '插入成功'
                })
            }
        } catch (error) {
            res.send(' 查询出错' + error)
        }
    },
    // 按用户名查询用户信息
    selectUersByName: async (req, res) => {
        const { username } = req.body;
        if (!username) {
            res.send('用户名不能为空')
        };
        try {
            let result = await UserService.selectUersByName(username);
            console.log(result)
            res.send({
                state: 0,
                data: result,
                msg: '查询用户成功'
            })
        } catch (error) {
            res.send(' 查询出错')
        }
    },
    // 查询名称是否重复——用于注册提示
    checkByName: async (req, res) => {
        try {
            // 重名？
            let userlist = await UserController.selectUersByName(req, res);
            if (userlist.length > 0) {
                res.send({
                    state: 0,
                    data: '',
                    msg: '该用户名已存在'
                })
            } else {
                res.send({
                    state: 1,
                    data: '',
                    msg: 'OK'
                })
            }
        } catch (error) {
            res.send(' 查询出错' + error)
        }
    },
    // 修改用户
    modifyUser: async (req, res) => {
        const { username = '', pone = '', addr = '', name = '', age = 0, sex = 0, usertype = 0 } = req.body;
        if (!username) {
            return res.send("修改失败")
        }
        try {
            // 重名？
            let result = await UserService.modifyUser({ username, pone, addr, name, age: Number(age), sex: Number(sex), usertype: Number(usertype) });
            console.log(result.affectedRows)
            if(result.affectedRows > 0){
                res.send({
                    state: 0,
                    data: result,
                    msg: '修改用户信息成功'
                })
            }else{
                res.send({
                    state: 1,
                    data: result,
                    msg: '失败'
                })
            }
        } catch (error) {
            res.send(' 出错' + error)
        }
    },
    // 删除用户
    deleteUser: async(req, res) => {
        let { username } = req.body;
        if(!username){
            return res.send('无法删除该用户')
        }
        try {
            const result = await UserService.deleteUser( username );
            console.log(result)
            res.send(result);
        } catch (error) {
            console.log(error)
            throw error;
        }
    }


}

module.exports = UserController