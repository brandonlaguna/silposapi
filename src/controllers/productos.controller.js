const mysql = require('../config/database').mysql_pool;
const jwt = require('jsonwebtoken');

const getProducts = async (req, res) => {
    try {
        var token = req.headers['authorization']
        if(!token){
            res.status(401).send({
              error: "Es necesario el token de autenticación",
              status:false,
              codeerror:401,
          })
            return
        }
      
        token = token.replace('Bearer ', '')
      
        jwt.verify(token, 'Secret Password', function(err, user) {
          if (err) {
            res.status(401).send({
              error: 'Token inválido',
              status:false,
              codeerror:401,
          })
          } else {
            mysql.getConnection(function (err, connection) {
                connection.query('SELECT * FROM productos LIMIT 30', function(err, rows, fields) {
                    if (err) throw err;
                    res.status(200).json({data:rows,status:true});
                  });
            });
          }
        })


    } catch (error) {
        res.status(200).json({data:false,status:false,codeerror:error});
    }
}

module.exports = {
    getProducts,
}