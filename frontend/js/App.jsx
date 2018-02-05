//JS file for frontend

var $ = require('jquery');

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