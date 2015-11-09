(function(){
  'use strict';

  var ursa = require('ursa');

  function call(req, cb){
    if(!req.param('email')){
      cb(CreateError.call('Missing email', 422));
    } else {
      Subscription.findOrCreate({ email: req.param('email') }, { email: req.param('email') }, function(err, subscription){
        if(err) return cb(err);
        var updates = {
          active: true
        };

        if(!subscription.keys) {
          var keys = ursa.generatePrivateKey();
          updates.keys = {
            private:  keys.toPrivatePem('base64'),
            pub:  keys.toPublicPem('base64')
          };
        }
        Subscription.update({ email: subscription.email }, updates, function(err, subscriptions){
          if(err) return cb(err);
          cb(null, subscriptions[0]);
        });
      });
    }
  }

  module.exports = {
    call: call
  };
}());
