(function(){
  'use strict';

  var request = require('request');

  function call(req, cb){
    request(['http://api.mygasfeed.com/stations/radius', req.param('lat'), req.param('lng'), req.param('dist'), req.param('type'), req.param('sort'), req.param('apiKey')].join('/') + '.json', function(err, response, body){
      if(err) { return cb(err); }
      cb(null, JSON.parse(body));
    });
  }

  module.exports = {
    call: call
  };
}());
