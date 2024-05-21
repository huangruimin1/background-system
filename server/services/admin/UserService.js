
const db = require('../../db/db')
var UserService = {
    // 登录
    login: (queryData) => {
        let sql = `select * from users where username='${queryData.username}' && password = '${queryData.password}'`;
        return db.query(sql);
    },
    // 更新头像
    updata: (queryData) => {
        let { __userid, avatar } = queryData;
        let sql = `update users set 
            avatar = '${avatar}' 
            where id = ${Number(__userid)}`;
        return db.query(sql)
    },
    // 查询用户信息
    getUserInfoById: (id) => {
        let sql = `select * from users where id = ${id}`;
        return db.query(sql);
    },
    // 插入用户
    registerUser: (val) => {
        let sql = `insert into users(username,password,pone,addr,name,age,sex,avatar,usertype)
        values ('${val.username}', 
        '${val.password}', 
        '${val.pone}', 
        '${val.addr}', 
        '${val.name}', 
        '${val.age}', 
        '${val.sex}', 
        '${val.avatar}', 
        '${val.usertype}')`
        return db.query(sql);
    },
    // 按照用户名查询用户
    selectUersByName(username) {
        let sql = `select username,pone,addr,name,age,sex,avatar,usertype from users where username = '${username}'`;
        return db.query(sql);
    },
    // 修改用户信息
    modifyUser(data) {
        const { username, pone, addr, name, age, sex, usertype } = data;
        let sql = `update users set pone = '${pone}'
        ,addr = '${addr}'
        ,name = '${name}'
        ,age = ${age}
        ,sex = ${sex}
        ,usertype = ${usertype} 
        where username = '${username}'`;
        return db.query(sql);
    },
    // 删除用户
    deleteUser: async(username) => {
        let sql = `delete from users where username = '${ username }'`;
        return db.query(sql); 
    }
}
const userModule = {
    id: 0,
    username: '',
    password: '',
    pone: '',
    addr: '',
    name: '',
    age: 18,
    sex: 0,
    avatar: '',
    usertype: 1,
}
module.exports = UserService;