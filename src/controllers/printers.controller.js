const jwt = require("jsonwebtoken");
var mysql = require("mysql");
const { connectionParams } = require("../functions/connectionParams");
const Printers = require('../models/printers.model');

const getPrinters = async (req, res) => {
  try {
    var connection = mysql.createConnection(connectionParams(req.headers));
    connection.connect();
    Printers.findAll(connection, function(err, employee) {
      if (err)
        res.send(err);

      res.send(employee);
    });
  } catch (error) {
      res.status(200).json({ data: false, status: false, codeerror: error });
  }
};

const createPrinter = async (req, res) => {
  try {
    var connection = mysql.createConnection(connectionParams(req.headers));
    connection.connect();
    const newPrinter = new Printers(req.body);

    if( req.body.constructor === Object && Object.keys(req.body).length === 0 ){
      res.status(400).send({ status: false, message: 'Por favor ingresar los datos solicitados', status_code: 401 });
    } else {

      Printers.create(connection, newPrinter, function(err, printer) {
        if (err)
          res.send(err);
        res.json({ status: true, message: "impresora creada correctamente!", data: printer, status_code: 200 });
      });
    }
  } catch (error) {
    res.status(200).json({ data: false, status: false, status_code: error });
  }
};

module.exports ={
  getPrinters,
  createPrinter
}
