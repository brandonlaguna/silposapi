const mysql = require('../config/database').mysql_pool;
const jwt = require('jsonwebtoken');

const getUsers = async (req, res) => {
    try {
        var token = req.headers['authorization']
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
                connection.query('SELECT * FROM usuarios', function(err, rows, fields) {
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

const getUsersById = async(req,res)=>{
  try {
    var token = req.headers['authorization'];
    var id = req.params.id;
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
            connection.query('SELECT * FROM usuarios WHERE id = '+id, function(err, rows, fields) {
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
    getUsers,
    getUsersById,
}