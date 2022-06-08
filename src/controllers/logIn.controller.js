const jwt = require("jsonwebtoken");
const mysql = require("../config/database").mysql_pool;

const authSocketToken = async (req, res) => {
  // try {
    var username = req.body.user;
    var password = req.body.password;

    var auth = false;

    mysql.getConnection(function (err, connection) {
      connection.query(
        'SELECT * FROM usuarios WHERE email = ? AND pass = ? AND activo = "1" ',
        [username, password],
        function (err, result, fields) {
          if (err) {
            res.status(401).send({
              error: "usuario o contraseña inválidos",
            });
            return;
          }
          if (result.length > 0) {
            const dataEmpresas = new Array();

            console.log(result[0].id);
            mysql.getConnection(function (err, connection) {
              connection.query("SELECT * FROM company_user cu INNER JOIN empresas e ON cu.company_id = e.id WHERE cu.user_id = ?",[result[0].id],function (err, business, fields) {
                dataEmpresas.push(business);
                  auth = true;
                  var tokenData = {
                    username: username,
                    // ANY DATA
                  };

                  var token = jwt.sign(tokenData, "Secret Password", {
                    expiresIn: (60 * 60 * 24)*30, // expires in 24 hours
                  });

                  console.log(dataEmpresas[0]);

                  res.send({
                    status: true,
                    token: token,
                    data: result,
                    dataEmpresas: dataEmpresas[0],
                    error: false,
                  });
                  return;
                }
              );
            });
          } else {
            res.status(401).send({
              error: "usuario o contraseña inválidos",
            });
            return;
          }
        }
      );
    });
  // } catch (e) {
    // res.status(200).json({ status: false, error: e });
  // }
};

const checkAuthStates = async (req, res) => {
  var token = req.body['accessToken'];
  if(!token){
    res.status(401).send({
      error: "Es necesario el token de autenticación"
    })
    return
  }
  token = token.replace('Bearer ', '')
  jwt.verify(token, 'Secret Password', function(err, user) {
    if (err) {
      res.status(401).send({data:{
        message: "Usuario inválido"
      },status:false})
    } else {
      res.status(200).json({data:{
        message: "Usuario válido"
      },status:true});
    }
  })
};

module.exports = {
  authSocketToken,
  checkAuthStates
};
