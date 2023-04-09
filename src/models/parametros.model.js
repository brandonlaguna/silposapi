'use strict';
//Parametros object create
class Parametros {
  constructor(parametro) {
    this.id                  = parametro.id;
  }

  static getLaboratorios(dbConn, result) {
    dbConn.query("SELECT * from laboratorio WHERE activo = 1", function (err, res) {
      if (err) {
        result(null, err);
      }
      else {
        result(null, res);
      }
    });
  }

  static getUbicacion(dbConn, result) {
    dbConn.query("SELECT * from ubicacion WHERE activo = 1", function (err, res) {
      if (err) {
        result(null, err);
      }
      else {
        result(null, res);
      }
    });
  }

  static getMedidas(dbConn, result) {
    dbConn.query("SELECT * from medidas_producto WHERE estado = 1", function (err, res) {
      if (err) {
        result(null, err);
      }
      else {
        result(null, res);
      }
    });
  }

  static getIVA(dbConn, result) {
    dbConn.query("SELECT * from iva WHERE estado = 1", function (err, res) {
      if (err) {
        result(null, err);
      }
      else {
        result(null, res);
      }
    });
  }
}

module.exports = Parametros;