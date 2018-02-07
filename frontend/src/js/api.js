var $ = require('jquery');
var Promise = require('../../../backend/promise');

const TIMEOUT = 5000;

exports.getLocations = () => {
  return new Promise( (resolve, reject) => {
    $.ajax({
      url: '/api/locations',
      type: 'GET',
      dataType: 'json',
      timeout:TIMEOUT
    })
    .done( (res) => resolve(res))
    .fail( (err) => reject(err));
  });
}

exports.getLatest = () => {
  return new Promise( (resolve, reject) => {
    $.ajax({
      url: '/api/measurements/latest',
      type: 'GET',
      dataType: 'json',
      timeout:TIMEOUT
    })
    .done( (res) => resolve(res))
    .fail( (err) => reject(err));
  });
}

exports.post = (location, temp) => {
  return new Promise( (resolve, reject) => {
    $.ajax({
      url: '/api/measurements',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({
        temperature: temp,
        location_id: location
      }),
      dataType: 'json',
      timeout:TIMEOUT
    })
    .done( (res) => resolve(res))
    .fail( (err) => reject(err));
  });
}