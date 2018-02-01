# SQL file for inserting locations

START TRANSACTION;

INSERT INTO re_locations 
  (name, latitude, longitude)
VALUES
  ("Tokio", "35.6584421", "139.7328635"),
  ("Helsinki", "60.1697530", "24.9490830"),
  ("New York", "40.7406905", "-73.9938438"),
  ("Amsterdam", "52.3650691", "4.9040238"),
  ("Dubai", "25.092535", "55.1562243");

COMMIT;