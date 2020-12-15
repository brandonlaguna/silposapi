const jwt = require('jsonwebtoken');
const mysql = require('../config/database').mysql_pool;


const authSocketToken = async (req, res) => {
    try {
        var username = req.body.user
        var password = req.body.password

        var auth =false;
        var dataEmpresas = [];

        mysql.getConnection(function (err, connection) {
            connection.query('SELECT * FROM usuarios WHERE email = ? AND pass = ? AND activo = "1" ',[username,password], function(err, result, fields) {
                if (err){
                    res.status(401).send({
                        error: 'usuario o contraseña inválidos'
                    })
                    return
                };
                if(result.length > 0){

                    connection.query('SELECT * FROM company_user cu INNER JOIN empresas e ON cu.company_id = e.id WHERE cu.user_id = ?',[result[0].id], function(err, business, fields) {
                        if(business.length > 0){
                            dataEmpresas = business;
                        }
                    });
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
                        data:result,
                        dataEmpresas:dataEmpresas,
                        error:false
                    })
                    return;

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
        res.status(200).json({status:false, error:e});
    }
}

module.exports = {
    authSocketToken
}