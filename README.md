# Reaktor ennakkotehtävä 2018

## Developement setup

1. Copy config/config-sample.js to config/config.js and modify as needed.
2. Build your mysql or mariaDB database against tables.sql and locations.sql
3. Run `npm install` to install all packages after initial setup
4. Run `gulp` to start developement server

## Production server

1. Run `./build_tar.sh`to create deployable tar package
2. Deploy this tar to run directory with command `tar xJvf`
3. Copy config/config-sample.js to config/config.js and modify as needed.
4. Build your mysql or mariaDB database against tables.sql and locations.sql
5. Start by running npm start or use for example pm2
