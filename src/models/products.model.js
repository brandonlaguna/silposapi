'use strict';
//Products object create
class Products {
  constructor(product) {
    this.id = product.id;
    this.fecha  = product.fecha;
    this.hora = product.hora;
    this.usuario  = product.usuario;
    this.referencia = product.referencia;
    this.barras = product.barras;
    this.articulo = product.articulo;
    this.factor_venta = product.factor_venta;
    this.iva  = product.iva;
    this.impuesto_dane  = product.impuesto_dane;
    this.precio_costo = product.precio_costo;
    this.venta_uno  = product.venta_uno;
    this.venta_dos  = product.venta_dos;
    this.venta_tres = product.venta_tres;
    this.venta_detal_uno  = product.venta_detal_uno;
    this.venta_detal_dos  = product.venta_detal_dos;
    this.venta_detal_tres = product.venta_detal_tres;
    this.codigo_fraccion  = product.codigo_fraccion;
    this.invima = product.invima;
    this.temperatura  = product.temperatura;
    this.ubicacion  = product.ubicacion;
    this.categoria  = product.categoria;
    this.url_foto = product.url_foto;
    this.activo = product.activo;
    this.laboratorio  = product.laboratorio;
    this.fraccion = product.fraccion;
    this.unidad = product.unidad;
    this.total  = product.total;
    this.minimo = product.minimo;
    this.maximo = product.maximo;
    this.faltante = product.faltante;
    this.sobrante = product.sobrante;
    this.bodega = product.bodega;
    this.tipo_cantidad  = product.tipo_cantidad;
    this.observaciones  = product.observaciones;
    this.articulo_general = product.articulo_general;
    this.bonificacion = product.bonificacion;
    this.ipoconsumo = product.ipoconsumo;
    this.color_producto = product.color_producto;
    this.complementos = product.complementos;
    this.kit  = product.kit;
    this.aiu  = product.aiu;
    this.imp_ipoconsumo = product.imp_ipoconsumo;
    this.type_item_identification_id  = product.type_item_identification_id;
    this.unit_measures_unidad = product.unit_measures_unidad;
    this.unit_measures_fraccion = product.unit_measures_fraccion;
    this.reference_price_id = product.reference_price_id;
    this.materia_prima  = product.materia_prima;
    this.total_temporal = product.total_temporal;
    this.manifiesto_id  = product.manifiesto_id;
  }

  static getProducts(dbConn, result) {
    dbConn.query("SELECT * from productos WHERE activo = 1", function (err, res) {
      if (err) {
        result(null, err);
      }
      else {
        result(null, res);
      }
    });
  }

  static addProduct(dbConn, product, result) {
    dbConn.query(`INSERT INTO productos set ?`, product, function (err, res) {
      if (err) {
        result(err, null);
      }
      else {
        result(null, res);
      }
    });
  }

  static updateProduct(dbConn, id, producto, result) {
    dbConn.query("UPDATE productos SET ? WHERE id = ?", [producto, id], function (err, res) {
      if (err) {
        result(null, err);
      } else {
        result(null, res);
      }
    });
  }

  static disableProduct(dbConn, producto, result) {
    dbConn.query("UPDATE productos SET activo = 0 WHERE id = ?", [producto.id], function (err, res) {
      if (err) {
        result(null, err);
      } else {
        result(null, res);
      }
    });
  }
}


module.exports = Products;