//JS file for frontend

const $ = require('jquery');
const React = require('react');
const ReactDOM = require('react-dom');
const api = require('./api');

const LocationContainer = require('./components/LocationContainer');

//react root element
const mountNode = $("#react-root")[0];


function onload() {
  ReactDOM.render(React.createElement(LocationContainer,
    {API: api}), mountNode);
  console.log(api.get(1, 0));
}

$(document).ready(onload);