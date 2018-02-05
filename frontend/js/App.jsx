//JS file for frontend

var $ = require('jquery');
var React = require('react');
var ReactDOM = require('react-dom');
var api = require('./api');
var Location = require('./Location');

function onload() {
  api.getLocations()
  .then(console.log)
}

$(document).ready(onload);