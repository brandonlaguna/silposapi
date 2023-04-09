var mysql = require("mysql");
const { connectionParams } = require("../functions/connectionParams");
const Products = require('../models/products.model');

const getProducts2 = async (req, res) => {
  try {
    var connection = mysql.createConnection(connectionParams(req.headers));
    connection.connect();
    Products.getProducts(connection, function(err, products) {
      if (err)
        res.status(500).json({ data: err, status: false });

      res.status(200).json({data:products,status:true});
    });
  } catch (error) {
      res.status(500).json({data:false,status:false,codeerror:error});
  }
};

const addProduct = async (req, res) => {
  try {
    var connection = mysql.createConnection(connectionParams(req.headers));
    connection.connect();
    const newProduct = new Products(req.body);

    if( req.body.constructor === Object && Object.keys(req.body).length === 0 ){
      res.status(400).send({ status: false, message: 'Por favor ingresar los datos solicitados' });
    } else {

      Products.addProduct(connection, newProduct, function(err, product) {
        if (err)
          res.json({ status: 400, message: "Ocurrio un error al guardar el producto", data: err });

        res.json({ status: 200, message: "producto creado correctamente!", data: product });

      });
    }
  } catch (error) {
    res.status(500).json({ data: false, status: false, codeerror: error });
  }
};

const updateProduct = async (req, res) => {
  try {
    var connection = mysql.createConnection(connectionParams(req.headers));
    connection.connect();
    const newProduct = new Products(req.body);

    if( req.body.constructor === Object && Object.keys(req.body).length === 0 ){
      res.status(400).send({ status: false, message: 'Por favor ingresar los datos solicitados' });
    } else {
      Products.updateProduct(connection, newProduct.id, newProduct, function(err, product) {
        if (err)
          res.send(err);

        res.json({ status: 200, message: "producto actualizado correctamente!", data: product });

      });
    }
  } catch (error) {
    res.status(500).json({ data: false, status: false, codeerror: error });
  }
};

const removeProduct = async (req, res) => {
  try {
    var connection = mysql.createConnection(connectionParams(req.headers));
    connection.connect();
    const itemToRemove = new Products(req.body);

    if( req.body.constructor === Object && Object.keys(req.body).length === 0 && itemToRemove.id > 0 ){
      res.status(400).send({ status: false, message: 'Por favor ingresar los datos solicitados' });
    } else {
      Products.disableProduct(connection, itemToRemove, function(err, product) {
        if (err)
          res.send(err);
        if(product.affectedRows > 0) {
          res.json({ status: 200, message: "producto eliminado correctamente!", data: { id: itemToRemove.id } });
        } else {
          res.status(404).json({ data: [], message: "producto no encontrado " + itemToRemove.id, status: false, codeerror: 404 });
        }
      });
    }
  } catch (error) {
    res.status(500).json({ data: false, status: false, codeerror: error });
  }
};

module.exports = {
  addProduct,
  getProducts2,
  updateProduct,
  removeProduct,
};
