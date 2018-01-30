'use strict';

var log = require('./log');
var db = require('./db');

exports getAll =  () => {
  
  return db.query('select * from er_locations;').then( (res) => {
    return {locations: res};
  });
};