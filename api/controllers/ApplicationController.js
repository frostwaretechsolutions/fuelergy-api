/**
 * ApplicationController
 *
 * @description :: Server-side logic for managing Applications
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var request = require('request');
module.exports = {
  update: function(req, res){
    request.post('http://api.mygasfeed.com/locations/price/' + req.param('apiKey') + '.json',{
      form: {
        stationid: req.param('stationid'),
        fueltype:  req.param('fueltype'),
        price:     req.param('price')
      }
    }, function(err, response, body){
      if(err) res.badRequest(err);
      res.json(body);
    });
  },
  stations: function(req, res){
    request(['http://api.mygasfeed.com/stations/radius', req.param('lat'), req.param('lng'), req.param('dist'), req.param('type'), req.param('sort'), req.param('apiKey')].join('/') + '.json', function(err, response, body){
      if(err) res.badRequest(err);
      res.json(JSON.parse(body));
    });
  }
};

