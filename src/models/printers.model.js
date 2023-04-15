'use strict';

class Printers {
  constructor(printer) {
    this.id   = printer.id;
    this.nombre           = printer.nombre;
    this.tipo             = printer.tipo;
    this.ruta             = printer.ruta;
    this.formato          = JSON.stringify(printer.formato);
    this.estado           = printer.estado;
    this.tipo_formato     = printer.tipo_formato;
  }

  static create(dbConn, newPrinter, result) {
    dbConn.query("INSERT INTO impresoras set ?", newPrinter, function (err, res) {
      if (err) {
        result(err, null);
      }
      else {
        result(null, res.insertId);
      }
    });
  }

  static findById(dbConn, id, result) {
    dbConn.query("Select * from impresoras where id = ? ", id, function (err, res) {
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
    dbConn.query("SELECT * FROM impresoras WHERE estado = 1", function (err, res) {
      if (err) {
        result(null, err);
      }
      else {
        result(null, res);
      }
    });
  }

  static update(dbConn, id, printer, result) {
    dbConn.query("UPDATE impresoras SET ? WHERE id = ?", [printer, id], function (err, res) {
      if (err) {
        result(null, err);
      } else {
        result(null, res);
      }
    });
  }

  static delete(dbConn, producto, result) {
    dbConn.query("UPDATE impresoras SET estado = 0 WHERE id = ?", [producto.id], function (err, res) {
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
module.exports = Printers;