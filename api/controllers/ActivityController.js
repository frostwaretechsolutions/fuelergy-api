(function(){
  'use strict';

  function create(req, res){
    Activity.create({ action: req.param('action'), resource: req.param('resource'), user: req.param('user') }, function(err){
      if(err) return res.negotiate(err);
      res.ok();
    });
  }

  module.exports = {
    create: create
  };
}());

