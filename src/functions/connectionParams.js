function connectionParams(data) {
  return {
    host: "localhost",
    user: data['dbu'],
    password: data['dbp'],
    database: data['dbd'],
  }
}

function masterConnection() {
  return {
    host: "localhost",
    user: "root",
    password: "123456789",
    database: "master",
  }
}

module.exports = {
  connectionParams,
  masterConnection
};