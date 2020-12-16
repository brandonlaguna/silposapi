
var mysql      = require('mysql');
var config;
config = {
    mysql_pool : mysql.createPool({
        host: "localhost",
        user: "root",
        password: "LuProject%97",
        database: "silposco_master"
    })
};
module.exports = config;