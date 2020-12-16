const jwt = require('jsonwebtoken');
const mysql = require('../config/database').mysql_pool;

const getBusiness = async (req,res)=>{
    try {
        var token = req.headers['authorization'];
        var businessId = req.headers['bsnid'];
        if(!token){
            res.status(401).send({
              error: "Es necesario el token de autenticación"
            })
            return
        }
        token = token.replace('Bearer ', '')
        jwt.verify(token, 'Secret Password', function(err, user) {
          if (err) {
            res.status(401).send({
              error: 'Token inválido'
            })
          } else {
            mysql.getConnection(function (err, connection) {
                connection.query('SELECT * FROM empresas WHERE id = ?',[businessId], function(err, rows, fields) {
                    if (err) throw err;
                    res.status(200).json({data:rows,status:true});
                  });
              });
          }
        })
    } catch (error) {
        res.status(200).json(error);
    }
}


module.exports = {
    getBusiness
}