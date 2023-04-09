var mysql = require("mysql");
const { connectionParams } = require("../functions/connectionParams");
const MetodosPago = require('../models/metodosPago.model');

const getMetodosPago = async (req, res) => {
  try {
    var connection = mysql.createConnection(connectionParams(req.headers));
    connection.connect();
    MetodosPago.getMetodosPagos(connection, function(err, metodosPagos) {
      if (err)
        res.status(500).json({ data: err, status: false });

      res.status(200).json({ data: metodosPagos, status: true});
    });
  } catch (error) {
      res.status(500).json({ data: false, status: false, codeerror: error});
  }
};

module.exports = {
  getMetodosPago,
};
