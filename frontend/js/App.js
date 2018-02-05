//JS file for frontend

var $ = require('jquery');
require('bootstrap');
var React = require('react');
var ReactDOM = require('react-dom');
var api = require('./api');

const LocationContainer = require('./components/LocationContainer');

//react root element
const mountNode = $("#react-root")[0];


function onload() {
  ReactDOM.render(React.createElement(LocationContainer,
    {API: api}), mountNode);
}

$(document).ready(onload);