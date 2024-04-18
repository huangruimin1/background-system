
const db = require('../../db/db')
var UserService = {
    login: (queryData)=>{
        let sql = `select * from users where username='${queryData.username}' && password = '${queryData.password}'`;
        return db.query(sql)
        .then((data,fields)=>{
            return data;
        },(err)=>{
            console.log(err);
            return '';
        })
    },
    updata:async(queryData)=>{
        let { __userid, avatar } = queryData;
        let sql = `update users set 
            avatar = '${ avatar }' 
            where id = ${ Number(__userid) }`;
        let result = {};
        await db.query(sql).then((data,fields)=>{
            result = data;
        },(err)=>{
            console.log(err);
            throw err;
        });
       return result;
    },
    getUserInfoById: async(id) => {
        let sql = `select * from users where id = ${id}`;
        let result = {};
        await db.query(sql).then((data,fields)=>{
            result = data;
        },(err)=>{
            console.log(err);
            throw err;
        });
        return result;
    }
}

module.exports = UserService;