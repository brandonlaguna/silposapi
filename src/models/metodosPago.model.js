'use strict';
//MetodosPago object create
class MetodosPago {
  constructor(metodoPago) {
    this.id = metodoPago.id;
    this.id = metodoPago.descripcion;
    this.id = metodoPago.activo;
    this.id = metodoPago.entradas;
    this.id = metodoPago.abonos;
    this.id = metodoPago.bancos;
    this.id = metodoPago.repor_abono_az;
    this.id = metodoPago.observacion;
    this.id = metodoPago.var_pago_mixto;
    this.id = metodoPago.payment_method_id;
  }

  static getMetodosPagos(dbConn, result) {
    dbConn.query("SELECT * from medios_pago WHERE activo = 1", function (err, res) {
      if (err) {
        result(null, err);
      }
      else {
        result(null, res);
      }
    });
  }

  static addMetodoPago(dbConn, metodoPago, result) {
    dbConn.query(`INSERT INTO medios_pago set ?`, metodoPago, function (err, res) {
      if (err) {
        result(err, null);
      }
      else {
        result(null, res);
      }
    });
  }

  static updateMetodoPago(dbConn, id, metodoPago, result) {
    dbConn.query("UPDATE medios_pago SET ? WHERE id = ?", [metodoPago, id], function (err, res) {
      if (err) {
        result(null, err);
      } else {
        result(null, res);
      }
    });
  }

  static disableMetodoPago(dbConn, metodoPago, result) {
    dbConn.query("UPDATE medios_pago SET activo = 0 WHERE id = ?", [metodoPago.id], function (err, res) {
      if (err) {
        result(null, err);
      } else {
        result(null, res);
      }
    });
  }
}

module.exports = MetodosPago;