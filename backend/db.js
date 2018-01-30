var mysql = require('mysql');
var config = require('../config/config');
var Promise = require('./promise');
var log = require('./log');

var db = mysql.createPool(config.db);


db.on('error', (err) => {
  log.error("Caught database error:" + err)
throw err;
});

//uses :key and js objects for query formatting
function format(query, values) {
  if(!values) {
    return query;
  }
  return query.replace(/:(\w+)/g, (txt, key) => {
    if(values.hasOwnProperty(key)) {
      return mysql.escape(values[key]);
    }
    return txt;
  });
}

// Returns new database connection
function getConnection() {
  return new Promise( (resolve, reject) => {
    db.getConnection( (err, conn) => {
      err ? reject(err) : resolve(conn);
    });
  });
}

//does database query, returns promise for that query
exports.query = (query, values) => {
  return getConnection().then( (conn) => {
    return new Promise( (resolve, reject) => {
      conn.query(format(query, values), (err, res) => {
        conn.release();
        err ? reject(err) : resolve(res);
      });
    });
  });
};