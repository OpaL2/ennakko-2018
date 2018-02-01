'use strict';

var db = require('./db');

exports.getAll =  () => {
  return db.query('select * from re_locations;').then( (res) => {
    return {locations: res};
  });
};