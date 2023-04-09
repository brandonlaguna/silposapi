const { masterConnection } = require("../functions/connectionParams");
var mysql = require("mysql");
const jwt = require("jsonwebtoken");
const User = require('../models/user.model');
const Company = require('../models/company.model');

const authLogin = async (req, res) => {
  try {
    var connection = mysql.createConnection(masterConnection());
    connection.connect();
    const authUser = new User(req.body);
    User.findByLogin(connection, authUser, function(err, employee) {
      if (err)
        res.send(err);

      if (employee.length > 0) {
        const userCompany = new Company(employee[0]);
        Company.findByUserId(connection, userCompany, function(err, company) {
          if (err)
            res.send(err);

          if (company.length == 0) {
            res.status(404).json({
              status: 404,
              data: "business not found"
            });
          }

          var tokenData = {
            user: employee[0].id,
            company: company[0].id,
            companyName: company[0].business_name,
            documento_representante: company[0].documento_representante
          };

          var token = jwt.sign(tokenData, "Secret Password", {
            expiresIn: (60 * 60 * 24)*30,
          });

          res.status(200).json({
            data: employee[0],
            businessData: company[0],
            token,
            status:200,
          });

        });
      } else {
        res.status(401).json(
          {
            data: "Credenciales incorrectas",
            status: 401,
            codeerror: "No autorizado"
          });
      }
    });
  } catch (error) {
      res.status(400).json({data:"error",status:false,codeerror:error});
  }
};

module.exports = { authLogin };
