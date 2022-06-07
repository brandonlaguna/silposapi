function connectionParams(data) {
  return {
    host: "localhost",
    user: data['dbu'],
    password: data['dbp'],
    database: data['dbd'],
  }
}

module.exports = connectionParams;