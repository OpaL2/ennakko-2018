'use strict';

var db = require('./db');
var Promise = require('./promise');

var getLatest = () => {
  return db.query('\
    SELECT locations.id AS location_id, t1.highest, t1.lowest,\
    t2.temperature AS latest, t3.total\
    FROM re_locations locations\
    LEFT JOIN\
      (SELECT MAX(registered_time) AS time, location_id, MAX(temperature) AS highest, MIN(temperature) AS lowest\
      FROM re_measurements\
      WHERE registered_time > DATE_SUB(NOW(), INTERVAL 24 HOUR)\
      GROUP BY location_id) AS t1\
    ON t1.location_id = locations.id\
    LEFT JOIN re_measurements t2\
    ON locations.id = t2.location_id\
    AND t1.time = t2.registered_time\
    LEFT JOIN\
      (SELECT COUNT(id) AS total, location_id\
      FROM re_measurements\
      GROUP BY location_id) AS t3\
    ON locations.id = t3.location_id;')
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

exports.get = (location_id, begin, amount) => {
  return db.query('\
    SELECT temperature, registered_time AS time, id\
    FROM re_measurements\
    WHERE location_id = :location_id\
    ORDER BY registered_time DESC\
    LIMIT :begin, :amount ;',
    {location_id: location_id,
      begin: begin,
      amount: amount
    }).then( (res) => {
      return {
        location_id:location_id,
        measurements:res
      };
    });
}