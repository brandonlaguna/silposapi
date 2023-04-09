'use strict';
//Categoria object create
class Categoria {
  constructor(categoria) {
    this.id = categoria.id;
    this.id = categoria.categoria;
    this.id = categoria.descripcion;
    this.id = categoria.bonificacion;
    this.id = categoria.fecha;
    this.id = categoria.activo;
  }

  static getCategorias(dbConn, result) {
    dbConn.query("SELECT * from categoria WHERE activo = 1", function (err, res) {
      if (err) {
        result(null, err);
      }
      else {
        result(null, res);
      }
    });
  }

  static addCategory(dbConn, category, result) {
    dbConn.query(`INSERT INTO categoria set ?`, category, function (err, res) {
      if (err) {
        result(err, null);
      }
      else {
        result(null, res);
      }
    });
  }

  static updateCategory(dbConn, id, category, result) {
    dbConn.query("UPDATE categoria SET ? WHERE id = ?", [category, id], function (err, res) {
      if (err) {
        result(null, err);
      } else {
        result(null, res);
      }
    });
  }

  static disableCategory(dbConn, category, result) {
    dbConn.query("UPDATE categoria SET activo = 0 WHERE id = ?", [category.id], function (err, res) {
      if (err) {
        result(null, err);
      } else {
        result(null, res);
      }
    });
  }
}

module.exports = Categoria;