var express = require('express');
var app = express();

var log = require('./log');
var apiRoutes = require('./api-routes');
var config = require('../config/config.js');

app.use('/api', apiRoutes);

app.listen(config.port, () => {
  log.info('App is listening port: ' + config.port);
});