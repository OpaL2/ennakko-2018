# SQL file for creating database tables

START TRANSACTION;

#Dropping old tables
DROP TABLE IF EXISTS
  re_locations,
  re_measurements;

CREATE TABLE re_locations (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(128) NOT NULL,
  latitude FLOAT NOT NULL,
  longitude FLOAT NOT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE re_measurements (
  id INT NOT NULL AUTO_INCREMENT,
  registered_time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  temperature FLOAT NOT NULL,
  location_id INT NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (location_id) REFERENCES re_locations (id)
) ENGINE=InnoDB;


COMMIT;