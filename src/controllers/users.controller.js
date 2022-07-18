var mysql = require("mysql");
const { masterConnection } = require("../functions/connectionParams");
const Users = require('../models/users.model');

const getAllUsers = async (req, res) => {
  try {
    var connection = mysql.createConnection(masterConnection());
    connection.connect();
    Users.findAll(connection, req.headers['company'], function(err, users) {
      if (err)
        res.send(err);

      res.status(200).json({data:users, status:true, codeerror:false});
    });
  } catch (error) {
      res.status(200).json({data:false, status:false, codeerror:error});
  }
};

module.exports={
    getAllUsers
}