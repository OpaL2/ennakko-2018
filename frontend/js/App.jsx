//JS file for frontend

var $ = require('jquery');
var React = require('react');
var ReactDOM = require('react-dom');

$( document ).ready( () => {
  $.ajax({
    url: '/api/locations',
    type: 'GET',
    dataType: 'json'
  })
  .done( (res) => {
    console.log(res);
  })
});