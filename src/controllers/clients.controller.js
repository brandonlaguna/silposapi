const jwt = require("jsonwebtoken");
var mysql = require("mysql");

const getClients = async (req, res) => {
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

            var connection = mysql.createConnection({
                host: "localhost",
                user: req.headers['dbu'],
                password: req.headers['dbp'],
                database: req.headers['dbd'],
              });
          
              connection.connect();
                connection.query('SELECT * FROM clientes', function(err, rows, fields) {
                    if (err) throw err;
                    res.status(200).json({data:rows,status:true,codeerror:false});
                  });
            
          }
        })
    } catch (error) {
        res.status(200).json({data:false,status:false,codeerror:error});
    }
};


module.exports ={
    getClients
}