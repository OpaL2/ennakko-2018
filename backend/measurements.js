'use strict';

var db = require('./db');
var Promise = require('./promise');

//FIX get latest db query to fetch latest temperature with following query:
//SELECT t1.location_id AS location_id, t3.temperature AS temp_latest 
//FROM ( 
//  SELECT MAX(registered_time) AS latest, location_id 
//  FROM re_measurements 
//  WHERE registered_time > DATE_SUB(NOW(), INTERVAL 24 HOUR) 
//  GROUP BY location_id) AS t1 
//INNER JOIN re_measurements t3 
//  ON t1.latest = t3.registered_time 
//  AND t1.location_id = t3.location_id;

var getLatest = () => {
  return db.query('\
    SELECT t1.location_id AS location_id, t1.temp_latest AS latest, \
    t2.temp_max AS highest, t2.temp_min AS lowest FROM \
      (SELECT MAX(registered_time) AS latest, location_id, \
      ANY_VALUE(temperature) AS temp_latest FROM\
      re_measurements \
      WHERE registered_time > DATE_SUB(NOW(), INTERVAL 24 HOUR)\
      GROUP BY location_id) AS t1\
      JOIN (SELECT location_id, MAX(temperature) AS temp_max, \
      MIN(temperature) AS temp_min FROM \
      re_measurements \
      WHERE registered_time > DATE_SUB(NOW(), INTERVAL 24 HOUR) \
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