var mysql = require("mysql");
const connectionParams = require("../functions/connectionParams");
const Clients = require('../models/clients.model');

const getClients = async (req, res) => {
    try {
      var connection = mysql.createConnection(connectionParams(req.headers));
      connection.connect();
      Clients.findAll(connection, function(err, employee) {
        if (err)
          res.send(err);

        //res.send(employee);
        res.status(200).json({data:employee,status:true,codeerror:false});
      });
    } catch (error) {
        res.status(200).json({data:false,status:false,codeerror:error});
    }
};

const createClients = async (req, res) => {
  try {
    var connection = mysql.createConnection(connectionParams(req.headers));
    connection.connect();
    const newClient = new Clients(req.body);

    if( req.body.constructor === Object && Object.keys(req.body).length === 0 ){
      res.status(400).send({ status: false, message: 'Por favor ingresar los datos solicitados' });
    } else {

      Clients.create(connection, newClient, function(err, client) {
        if (err)
          res.send(err);

        res.json({ status: true, message: "cliente creado correctamente!", data: client });

      });
    }
  } catch (error) {
    res.status(200).json({ data: false, status: false, codeerror: error });
  }
};
module.exports ={
    getClients,
    createClients
}