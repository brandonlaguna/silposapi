'use strict';
//Employee object create
class Clients {
  constructor(client) {
    this.tipo_doc               = client.tipo_doc;
    this.documento              = client.documento;
    this.digito                 = client.digito;
    this.nombres                = client.nombres;
    this.apellidos              = client.apellidos;
    this.razon_social           = client.razon_social;
    this.trade_name             = client.trade_name;
    this.direccion              = client.direccion;
    this.telefonos              = client.telefonos;
    this.country_id             = client.country_id;
    this.nacimiento             = client.nacimiento;
    this.genero                 = client.genero;
    this.email                  = client.email;
    this.activo                 = client.activo;
    this.fecha                  = client.fecha;
    this.hora                   = client.hora;
    this.precio                 = client.precio;
    this.pagina                 = client.pagina;
    this.porcentaje             = client.porcentaje;
    this.observaciones          = client.observaciones;
    this.id_imagen              = client.id_imagen;
    this.type_organization_id   = client.type_organization_id;
    this.type_regime_id         = client.type_regime_id;
    this.type_liability_id      = client.type_liability_id;
    this.tax_detail_id          = client.tax_detail_id;
    this.merchant_registration  = client.merchant_registration;
    this.cod_ciudad             = client.cod_ciudad;
    this.created_at             = new Date();
    this.updated_at             = new Date();
  }
  static create(dbConn, newClient, result) {
    dbConn.query("INSERT INTO clientes set ?", newClient, function (err, res) {
      if (err) {
        result(err, null);
      }
      else {
        result(null, res.insertId);
      }
    });
  }

  static findById(dbConn, id, result) {
    dbConn.query("Select * from clientes where id = ? ", id, function (err, res) {
      if (err) {
        console.log("error: ", err);
        result(err, null);
      }
      else {
        result(null, res);
      }
    });
  }

  static findAll(dbConn, result) {
    dbConn.query("Select * from clientes WHERE activo = 1", function (err, res) {
      if (err) {
        result(null, err);
      }
      else {
        result(null, res);
      }
    });
  }

  static update(dbConn, id, cliente, result) {
    dbConn.query("UPDATE clientes SET WHERE id = ?", [id], function (err, res) {
      if (err) {
        console.log("error: ", err);
        result(null, err);
      } else {
        result(null, res);
      }
    });
  }

  static delete(dbConn, id, result) {
    dbConn.query("DELETE FROM clientes WHERE id = ?", [id], function (err, res) {
      if (err) {
        console.log("error: ", err);
        result(null, err);
      }
      else {
        result(null, res);
      }
    });
  }
}

module.exports = Clients;