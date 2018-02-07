'use strict';

var express = require('express');
var util = require('util')

var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();

var router = express.Router();

var log = require('./log');
var locations = require('./locations');
var measurements = require('./measurements');

//responsible for sending responses
function ok(res) {
  return (data) => {
    res.json(data);
  };
};

//Handles all api internal server error situations
function err(res, errStatus) {
  if(errStatus === undefined) 
    {errStatus = 500};
  return (data) => {
    log.error('Caught error', util.inspect(data));
    res.sendStatus(errStatus);
  };
};

router.get('/locations', (req, res) => {
  log.info('Locations requested from: ', req.socket.address());
  locations.getAll().then(ok(res), err(res))
});

router.get('/measurements/latest', (req, res) => {
  log.info('Latest measurements requested from: ', req.socket.address());
  measurements.getLatest().then(ok(res), err(res));
});

router.get('/measurements', jsonParser, (req, res) => {
  log.info('Some measurements requested from: ', req.socket.address());
  measurements.get(req.body),then(ok(res), err(res));
});

router.post('/measurements', jsonParser, (req, res) => {
  log.info('New measurement posted from: ', req.socket.address());
  measurements.create(req.body.temperature, req.body.location_id)
    .then(ok(res), err(res));
});

module.exports = router;