'use strict';
//Employee object create
class Users {
  constructor(client) {
    this.tipo_doc               = client.tipo_doc;
    this.documento              = client.documento;
    this.identification_number  = identification_number;
    this.first_name             = first_name;
    this.other_names            = other_names;
    this.surname                = surname;
    this.second_surname         = second_surname;
    this.address                = address;
    this.telefonos              = telefonos;
    this.municipality_id        = municipality_id;
    this.nacimiento             = nacimiento;
    this.genero                 = genero;
    this.pass                   = pass;
    this.email                  = email;
    this.activo                 = activo;
    this.eps                    = eps;
    this.observaciones          = observaciones;
    this.rol                    = rol;
    this.permiso                = permiso;
    this.foto                   = foto;
    this.created_at             = created_at;
    this.updated_at             = updated_at;
  }

  static create(dbConn, newClient, result) {
    dbConn.query("INSERT INTO usuarios set ?", newClient, function (err, res) {
      if (err) {
        result(err, null);
      }
      else {
        result(null, res.insertId);
      }
    });
  }

  static findAll(dbConn, id, result) {
    dbConn.query("SELECT u.* FROM company_user cu INNER JOIN usuarios u ON cu.user_id = u.id INNER JOIN empresas c ON cu.company_id = c.id WHERE c.id = ? ", [id], function (err, res) {
      if (err) {
        result(null, err);
      }
      else {
        result(null, res);
      }
    });
  }

  static findById(dbConn, id, result) {
    dbConn.query("Select * from usuarios where id = ? ", id, function (err, res) {
      if (err) {
        console.log("error: ", err);
        result(err, null);
      }
      else {
        result(null, res);
      }
    });
  }

  static update(dbConn, id, cliente, result) {
    dbConn.query("UPDATE usuarios SET WHERE id = ?", [id], function (err, res) {
      if (err) {
        console.log("error: ", err);
        result(null, err);
      } else {
        result(null, res);
      }
    });
  }

  static delete(dbConn, id, result) {
    dbConn.query("DELETE FROM usuarios WHERE id = ?", [id], function (err, res) {
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

module.exports = Users;
