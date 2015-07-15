(function(){
  var request = require('request');
  function update(req, res){
    UpdateStation.call(req, function(err, body){
      if(err) return res.negotiate(err);
      res.json(body);
    });
  }


  function stations(req, res){
    FindStations.call(req, function(err, results){
      if(err) { return res.negotiate(err); }
      res.json(results);
    });
  }
  module.exports = {
    update: update,
    stations: stations
  };
}());
