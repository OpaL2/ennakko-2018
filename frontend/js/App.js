//JS file for frontend

var $ = require('jquery');
var React = require('react');
var ReactDOM = require('react-dom');
var api = require('./api');
var Location = require('./Location');

//react root element
const rootNode = $("#react-root")[0];


function onload() {
  api.postNew(1, 12)
  .then(console.log, console.log);
}

$(document).ready(onload);