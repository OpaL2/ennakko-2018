'use strict';

var db = require('./db');
var Promise = require('./promise');

select * FROM (SELECT max(registered_time) as latest, location_id, any_value(temperature) as temp_latest from re_measurements GROUP BY location_id) as t1 JOIN (SELECT location_id, MAX(temperature) as temp_max, MIN(temperature) as temp_min FROM re_measurements WHERE registered_time > DATE_SUB(NOW(), INTERVAL 24 HOUR)  GROUP BY location_id) AS t2 on t1.location_id = t2.location_id;

{
  "measurements": [
    
      "latest": float,
      "highest": float,
      "lowest": float
    }
  ]

var getLatest = () => {
  return db.query('\
    SELECT t1.location_id AS location_id, t1.temp_latest AS latest, \
    t2.temp_max AS highest, t2.temp_min AS lowest FROM \
      (SELECT MAX(registered_time) AS latest, location_id, \
      ANY_VALUE(temperature) AS temp_latest FROM\
      re_measurements \
      WHERE registered_time > DATE_SUB(NOW(), INTERVAL 24 HOUR)\
      GROUP BY location id) AS t1\
      JOIN (SELECT location_id, MAX(temperature) AS temp_max, \
      MIN(temperature) AS temp_min FROM \
      re_measurements \
      WHERE registered_time > DATE_SUB(NOW(), INTERVAL 24 HOUR \
      GROUP BY location_id) AS t2 \
      ON t1.location_id = t2.location_id;')
    .then( (res) => {
        return {measurements: res};
      });
};

exports.getLatest = getLatest;

exports.create = (temperature, id) => {
  return db.query('INSERT INTO re_measurements (temperature, location_id)\
    VALUES (:temperature, :id)', {temperature:temperature, id:id}).then( () => {
      return getLatest()});
};