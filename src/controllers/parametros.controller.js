var mysql = require("mysql");
const { connectionParams } = require("../functions/connectionParams");
const Parametros = require('../models/parametros.model');

const getLaboratoriosProducto = async (req, res) => {
  try {
    var connection = mysql.createConnection(connectionParams(req.headers));
    connection.connect();
    Parametros.getLaboratorios(connection, function(err, laboratorios) {
      if (err)
        res.status(500).json({ data: err, status: false });

      res.status(200).json({ data: laboratorios, status: true});
    });
  } catch (error) {
      res.status(500).json({ data: false, status: false, codeerror: error});
  }
};

const getUbicacionProducto = async (req, res) => {
  try {
    var connection = mysql.createConnection(connectionParams(req.headers));
    connection.connect();
    Parametros.getUbicacion(connection, function(err, ubicacion) {
      if (err)
        res.status(500).json({ data: err, status: false });

      res.status(200).json({ data: ubicacion, status: true});
    });
  } catch (error) {
      res.status(500).json({ data: false, status: false, codeerror: error});
  }
};

const getMedidasProducto = async (req, res) => {
  try {
    var connection = mysql.createConnection(connectionParams(req.headers));
    connection.connect();
    Parametros.getMedidas(connection, function(err, ubicacion) {
      if (err)
        res.status(500).json({ data: err, status: false });

      res.status(200).json({ data: ubicacion, status: true});
    });
  } catch (error) {
      res.status(500).json({ data: false, status: false, codeerror: error});
  }
};

const getIVAProducto = async (req, res) => {
  try {
    var connection = mysql.createConnection(connectionParams(req.headers));
    connection.connect();
    Parametros.getIVA(connection, function(err, ubicacion) {
      if (err)
        res.status(500).json({ data: err, status: false });

      res.status(200).json({ data: ubicacion, status: true});
    });
  } catch (error) {
      res.status(500).json({ data: false, status: false, codeerror: error});
  }
};

module.exports = {
  getLaboratoriosProducto,
  getUbicacionProducto,
  getMedidasProducto,
  getIVAProducto,
};
