(function(){
  'use strict';

  function call(req, cb){
    User.findOne({ username: req.param('username'), password: req.param('password') }, function(err, user){
      if(err) { return cb(err); }
      else if(!user) { return cb(CreateError.call('User not found', 404)); }
      cb(null, user);
    });
  }
  module.exports = {
    call: call
  };
}());
