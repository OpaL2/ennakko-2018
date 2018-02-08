var $ = require('jquery');
var Promise = require('../../../backend/promise');

exports.getLocations = () => {
  return Promise.resolve(
    $.ajax({
      url: '/api/locations',
      type: 'GET',
      dataType: 'json',
      timeout:3000
    }));
}

exports.getLatest = () => {
  return Promise.resolve(
    $.ajax({
      url: '/api/measurements/latest',
      type: 'GET',
      dataType: 'json',
      timeout:3000
    }));
}

exports.get = (location_id, page) => {
  return Promise.resolve(
    $.ajax({
      url: '/api/measurements/' + location_id + '/' + page,
      type: 'GET',
      dataType: 'json',
      timeout: 3000
    }));
}

exports.post = (location, temp) => {
  return Promise.resolve(
    $.ajax({
      url: '/api/measurements',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({
        temperature: temp,
        location_id: location
      }),
      dataType: 'json',
      timeout:3000
    }));
}