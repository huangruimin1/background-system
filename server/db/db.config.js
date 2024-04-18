var dbConfig = {
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'background_system',
    port: '3306',
    connectionLimit: 10,
    timezone: "08:00",
    multipleStatements: true // 开启同时执行多条SQL
};
module.exports = dbConfig