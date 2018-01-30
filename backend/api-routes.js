'use strict';

var express = require('express');

var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();

var router = express.Router();


function ok(res) {

}

function err(res) {

}

router.get('/locations', (req, res) => {

});

router.get('/measurements/latest', (req, res) => {

});

router.post('/measurements', jsonParser, (req, res) => {

});