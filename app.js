var express = require('express');
var app = express();

var log = require('./backend/log');
var apiRoutes = require('./backend/api-routes');
var config = require('./config/config.js');

app.use('/api', apiRoutes);

app.get(['/', '/index.html'], (req, res) => {
  res.sendFile(path.join(__dirname,'/frontend/index.html'));
});

app.use('/public/', express.static(path.join(__dirname, '/frontend/public')));

app.listen(config.port, () => {
  log.info('App is listening port: ' + config.port);
});