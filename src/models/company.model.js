'use strict';
//Company object create
class Company {
  constructor(client) {
    this.user_id                  = client.user_id;
  }

  static findByUserId(dbConn, authUser, result) {
    dbConn.query(
      `SELECT c.*, c.business_name as logo FROM empresas c, company_user cu WHERE cu.user_id = ? AND cu.company_id = c.id LIMIT 1`,
      [authUser.user_id],
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

module.exports = Company;