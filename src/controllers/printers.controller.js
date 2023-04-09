const jwt = require("jsonwebtoken");
var mysql = require("mysql");
const { connectionParams } = require("../functions/connectionParams");
const Printers = require('../models/printers.model');

const getPrinters = async (req, res) => {
  try {
    var connection = mysql.createConnection(connectionParams(req.headers));
    connection.connect();
    Printers.findAll(connection, function(err, printers) {
      if (err)
        res.status(500).json({ data: err, status: false });

        res.status(200).json({ data: printers, status: true });
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
          res.status(500).json({ data: err, status: false });

        res.json({ status: true, message: "impresora creada correctamente!", data: printer, status_code: 200 });
      });
    }
  } catch (error) {
    res.status(500).json({ data: false, status: false, status_code: error });
  }
};

const updatePrinter = async (req, res) => {
  try {
    var connection = mysql.createConnection(connectionParams(req.headers));
    connection.connect();
    const printerData = new Printers(req.body);

    if( req.body.constructor === Object && Object.keys(req.body).length === 0 ){
      res.status(400).send({ status: false, message: 'Por favor ingresar los datos solicitados', status_code: 401 });
    } else {
      Printers.update(connection, printerData.id, printerData, function(err, printer) {
        if (err)
          res.status(401).json({ message: err, status: false, data: [], status_code: 401});

        if (printer.affectedRows == 0)
          res.status(402).json({ data: [], status: false, message: "Impresora no pudo ser actualizada, verfica los datos", status_code: 402 });

        res.status(200).json({ status: true, message: "impresora actualizada correctamente!", data: printer, status_code: 200 });
      });
    }
  } catch (error) {
    res.status(500).json({ data: [], status: false, status_code: error, status_code: 500 });
  }
};

const deletePrinter = async (req, res) => {
  try {
    var connection = mysql.createConnection(connectionParams(req.headers));
    connection.connect();
    const printerData = new Printers(req.body);
    if( req.body.constructor === Object && Object.keys(req.body).length === 0 ){
      res.status(401).send({ status: false, message: 'Por favor ingresar los datos solicitados', status_code: 401 });
    } else {
      Printers.delete(connection, printerData, function(err, printer) {
        if (err)
          res.status(402).json({ message: err, status: false, data: [], status_code: 402});

        if (printer.affectedRows == 0)
          res.status(403).json({ data: [], status: false, message: "Impresora no eliminada!", status_code: 403 });

        res.status(200).json({ status: true, message: "impresora eliminada correctamente!", data: printer, status_code: 200 });
      });
    }
  } catch (error) {
    res.status(500).json({ data: [], status: false, status_code: error, status_code: 500 });
  }
};

module.exports ={
  getPrinters,
  createPrinter,
  updatePrinter,
  deletePrinter
}
