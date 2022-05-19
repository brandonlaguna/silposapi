
var mysql      = require('mysql');
var config;
config = {
    mysql_pool : mysql.createPool({
        host: "localhost",
        user: "root",
        password: "13703322",
        database: "master"
    })
};
module.exports = config;
