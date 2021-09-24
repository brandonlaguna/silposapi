
var mysql      = require('mysql');
var config;
config = {
    mysql_pool : mysql.createPool({
        host: "localhost",
        user: "silposco_master",
        password: "w4rH%I,75iID",
        database: "silposco_master"
    })
};
module.exports = config;
