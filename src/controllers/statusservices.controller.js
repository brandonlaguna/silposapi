const jwt = require('jsonwebtoken');
const mysql = require('../config/database').mysql_pool;

const statusServices = (req,res) => {
    try {
        var token = req.headers['authorization']
        var businessId = req.headers['Company'];
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
                connection.query('SELECT * FROM empresas WHERE id =?',[businessId], function(err, rows, fields) {
                    if (err) throw err;
                    res.status(200).json(
                        {
                            status:true,
                            database:true,
                            codeerror:false,
                        }
                    );
                  });
              });
          }
        })
    } catch (error) {
        res.status(200).json(error);
    }
}

module.exports={
    statusServices,
}