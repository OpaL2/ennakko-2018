'use strict';

var express = require('express');
var util = require('util')

var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();

var router = express.Router();

var log = require('./log');
var locations = require('./locations')

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
  locations.getAll().then(ok(res), err(res))
});

router.get('/measurements/latest', (req, res) => {

});

router.post('/measurements', jsonParser, (req, res) => {

});

module.exports = router