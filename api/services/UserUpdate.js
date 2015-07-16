(function(){
  'use strict';

  function call(req, cb){
    User.update({ id: req.param('id') }, req.params.all(), function(err, users){
      if(err) { return cb(err); }
      else if(users.length === 0) { return cb(CreateError.call('User not found', 404)); }
      cb(null, users[0]);
    });
  }

  module.exports = {
    call: call
  };
})();
