'use strict';

var db = require('./db');
var Promise = require('./promise');

var getLatest = () => {
  return db.query('\
    SELECT locations.id AS location_id, t1.highest, t1.lowest, t2.temperature AS latest\
    FROM re_locations locations\
    LEFT JOIN\
      (SELECT MAX(registered_time) AS time, location_id, MAX(temperature) AS highest, MIN(temperature) AS lowest\
      FROM re_measurements\
      WHERE registered_time > DATE_SUB(NOW(), INTERVAL 24 HOUR)\
      GROUP BY location_id) AS t1\
    ON t1.location_id = id\
    LEFT JOIN re_measurements t2\
    ON t1.location_id = t2.location_id\
    AND t1.time = t2.registered_time;')
    .then( (res) => {
      return {measurements: res};
    });
}

exports.getLatest = getLatest;

exports.create = (temperature, id) => {
  return db.query('INSERT INTO re_measurements (temperature, location_id)\
    VALUES (:temperature, :id)', {temperature:temperature, id:id}).then( () => {
      return getLatest()});
};