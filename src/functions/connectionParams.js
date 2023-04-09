function connectionParams(data) {
  return {
    host: "localhost",
    user: data['dbu'],
    password: data['dbp'] ? data['dbp'] : "",
    database: data['dbd'],
  }
}

function masterConnection() {
  return {
    host: "localhost",
    user: "silposco_master",
    password: "w4rH%I,75iID",
    database: "silposco_master",
  }
}

module.exports = {
  connectionParams,
  masterConnection
};