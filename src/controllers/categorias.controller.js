var mysql = require("mysql");
const { connectionParams } = require("../functions/connectionParams");
const Categoria = require('../models/categorias.model');

const getCategorias = async (req, res) => {
  try {
    var connection = mysql.createConnection(connectionParams(req.headers));
    connection.connect();
    Categoria.getCategorias(connection, function(err, categorias) {
      if (err)
        res.status(500).json({ data: err, status: false });

      res.status(200).json({ data: categorias, status: true});
    });
  } catch (error) {
      res.status(500).json({ data: error, status: false, codeerror: error});
  }
};

module.exports={
    getCategorias
}