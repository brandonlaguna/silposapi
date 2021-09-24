const jwt = require("jsonwebtoken");
var mysql = require("mysql");

const backupventas = async (req,res)=>{
    try {
        var token = req.headers['authorization'];
        var businessId = req.headers['bsnid'];
        var data = req.body.ventas;
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

	   var connection = mysql.createConnection({
              host: "localhost",
              user: req.headers['dbu'],
              password: req.headers['dbp'],
              database: req.headers['dbd'],
            });
            var dictstring = JSON.stringify(data);          
         connection.connect(function(err) {
                    if (err) throw err;
                    var sql = "INSERT INTO backup_ventas_movil (response, status) VALUES ('"+dictstring+"','1')";
                    connection.query(sql, function (err, result) {
                      if (err) throw err;
                      res.status(200).json({data:result,status:true});
                    });
           });
	 //res.status(200).json({status:dictstring});
          }
        })
    } catch (error) {
        res.status(200).json(error);
    }
}

module.exports = {
    backupventas
}
