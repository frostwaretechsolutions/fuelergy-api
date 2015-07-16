(function(){
  'use strict';
  function login(req, res){
    UserLogin.call(req, function(err, user){
      if(err) return res.negotiate(err);
      res.json(user);
    });
  }

  function update(req, res){
    UserUpdate.call(req, function(err, user){
      if(err) return res.negotiate(err);
      res.json(user);
    });
  }

  module.exports = {
    login:  login,
    update: update
  };
}());

