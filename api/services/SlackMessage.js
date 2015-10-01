(function(){
  'use strict';

  module.exports = {
    call: call
  };

  function call(req, issue, cb){
    sails.config.slack.send({
      username: 'Fuelergy',
      text: req.param('email') + ' send the following message\nhttps://waffle.io/frostwaretechsolutions/fuelergy\n' + req.param('message'),
      unfurl_links: true
    }, cb);
  }
}());
