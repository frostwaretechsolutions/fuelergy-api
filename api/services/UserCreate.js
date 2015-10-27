(function(){
  'use strict';

  function call(req, cb){
    User.find({ 
      or: [
        { username: req.param('username') },
        {  email: req.param('email') }
      ]
    }, function(err, user){
      if(err) { return cb(err); }
      else if(user) { return cb(CreateError.call('User already exists', 409)); }
      User.create({ username: req.param('username'), email: req.param('email'), password: req.param('password') }, function(err, user){
        if(err) { return cb(err); }
        cb(null, user);
      });
    });
  }
  module.exports = {
    call: call
  };
}());
