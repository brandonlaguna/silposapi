const jwt = require('jsonwebtoken');

async function verifyJWTToken(request, response, next) {
  var token = request.headers['authorization'];
  if(!token){
    response.status(401).send({
        error: "Es necesario el token de autenticación",
        status:false,
        codeerror:401,
    })
    return
  }
  token = token.replace('Bearer ', '')
  jwt.verify(token, 'Secret Password', function(err, user) {
    if (err) {
      response.status(401).send({
        error: 'Token inválido',
        status:false,
        codeerror:401,
      })
    }
  next();
  });
}
module.exports ={
  verifyJWTToken,
}