(function(){
  'use strict';

  function call(req, cb){
    sails.config.github.issues.create({
      user: 'frostwaretechsolutions',
      repo: 'fuelergy',
      title: '[' + req.param('subject') + '] Website Contact',
      body: req.param('email')  + ' has submitted the following \n' + req.param('message'),
      labels: ['website-contact']
    }, function(err, issue){
      err ? cb(err) : cb();
    });
  }

  module.exports = {
    call: call
  };

}());
