var config = require('./db.Config');
var mysql = require('mysql');
var db    = {};  
var pool  = mysql.createPool(config);  
 
db.query = function (sql, para = '') {
  return new Promise(function (resolve,reject) {
    pool.query(sql, para, function (err, rows, fields) {
      if(err){
        reject(err);
      }else{
        resolve(rows,fields);
      }
    });
  })
}

module.exports = db;