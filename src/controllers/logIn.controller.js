const jwt = require('jsonwebtoken');
const mysql = require('../config/database').mysql_pool;


const authSocketToken = async (req, res) => {
    try {
        var username = req.body.user
        var password = req.body.password

        var auth =false;

        mysql.getConnection(function (err, connection) {
            connection.query('SELECT * FROM usuarios WHERE user = ? AND pass = ? ',[username,password], function(err, result, fields) {
                if (err) throw err;
                if(result.length > 0){
                    auth = true;
                    var tokenData = {
                        username: username
                        // ANY DATA
                    }
            
                    var token = jwt.sign(tokenData, 'Secret Password', {
                        expiresIn: 60 * 60 * 24 // expires in 24 hours
                    })
            
                    res.send({
                        status:true,
                        token:token,
                        data:result
                    })

                }else{
                    res.status(401).send({
                        error: 'usuario o contraseña inválidos'
                    })
                    return
                }
              });
        });

        // if (!auth) {
        //     res.status(401).send({
        //         error: 'usuario o contraseña inválidos'
        //     })
        //     return
        // }

    } catch (e) {
        res.status(200).json({status:false, errors:e});
    }
}

module.exports = {
    authSocketToken
}