(function(){
  'use strict';

  var request = require('request');

  function call(req, cb){
    request.post('http://api.mygasfeed.com/locations/price/' + req.param('apiKey') + '.json',{
      form: {
        stationid: req.param('stationid'),
        fueltype:  req.param('fueltype'),
        price:     req.param('price')
      }
    }, function(err, response, body){
      if(err) return cb(err);
      cb(null, body);
    });
  }

  module.exports = {
    call: call
  };
}());
