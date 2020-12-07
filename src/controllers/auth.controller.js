const jwt = require('jsonwebtoken');

const jwtAuth =(restoken)=>{
    try {
      
        token = restoken.replace('Bearer ', '')
        jwt.verify(token, 'Secret Password', function(err, user) {
          if (err) {
            return false;
          } else {
            return true;
          }
        })


    } catch (error) {
        return false;
    }
}

module.exports = {
    jwtAuth,
}