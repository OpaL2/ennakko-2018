'use strict';

var db = require('./db');
var Promise = require('./promise');


var getLatest = () => {
  return db.query('SELECT * FROM re_measurements;');
};

exports.getLatest = getLatest;

exports.create = (temperature, id) => {
  return db.query('INSERT INTO re_measurements (temperature, location_id)\
    VALUES (:temperature, :id)', {temperature:temperature, id:id}).then( () => {
      return getLatest()});
};