(function(){
  'use strict';

  var ursa = require('ursa');

  function call(req, cb){
    if(!(req.param('key') && req.param('email'))){
      cb(CreateError.call('Mission param', 422));
    } else {
      Subscription.findOne({email: req.param('email') }, function(err, subscription){
        if(err) return c (err);
        if(!subscription) return cb(CreateError.call('Not Found', 404));

        if(ursa.createPrivateKey(subscription.keys.private, '', 'base64').decrypt(req.param('key'), 'base64', 'utf8') == subscription.email) {
          var keys = ursa.generatePrivateKey();
          var updates = {
            keys: {
              private: keys.toPrivatePem('base64'),
              pub: keys.toPublicPem('base64')
            },
            active: false
          };
          Subscription.update({email: req.param('email') }, updates, function(err, subscription){
            if(err) return cb(err);
            cb();
          });
        } else {
          cb(CreateError.call('Incorrect param', 409));
        }
        
      });
    }
  }

  module.exports = {
    call: call
  };
}());
