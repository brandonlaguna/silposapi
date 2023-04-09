'use strict';
//User object create
class User {
  constructor(client) {
    this.email                  = client.user;
    this.pass                   = client.password;
  }

  static findByLogin(dbConn, authUser, result) {
    dbConn.query(
      `SELECT u.*, cu.*, u.id as user_id FROM company_user cu, usuarios u WHERE u.email = ? AND u.pass = ? AND cu.user_id = u.id AND cu.activo = 1`,
      [authUser.email, authUser.pass],
      function (err, res) {
      if (err) {
        console.log("error: ", err);
        result(err, null);
      }
      else {
        result(null, res);
      }
    });
  }
}

module.exports = User;