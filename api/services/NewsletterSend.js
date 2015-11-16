(function(){
  'use strict';

  var ursa = require('ursa');
  var nconf = require('nconf');

  function call(cb){
    Subscription.where({ active: true }, function(err, subscriptions){
      if(err) return cb(err);
      

      Weebly.call(function(err, items){
        if(err) return cb(err);
        var email = new sails.config.sendgrid.Email({
          to: 'newsletter@fuelergy.com',
          bcc: subscriptions.map(function(subscription){
            return subscription.email;
          }),
          from: 'newsletter@fuelergy.com',
          subject: items[0].title,
        });

        email.addFilter('templates', 'enable', 1);
        email.addFilter('templates', 'template_id', process.env.SENDGRID_TEMPLATE_ID || nconf.get('sendgrid:template_id'));
        email.setHtml(items[0].description + '<br /><br /><p>To unsubscribe <a href="http://' + (process.env.BASE_URL || 'localhost:1337') + '/unsubscribe/-email-/-customerKey-">click here</a>');
        email.addSubstitution('-email-', subscriptions.map(function(subscription){
          return encodeURIComponent(subscription.email);
        }));
        email.addSubstitution('-customerKey-', subscriptions.map(function(subscription){
          return encodeURIComponent(ursa.createPublicKey(subscription.keys.pub, 'base64').encrypt(new Buffer(subscription.email), 'utf8', 'base64'));
        }));

        sails.config.sendgrid.send(email, function(err, json){
          if(err) return cb(err);
          cb();
        });
      });
    });
  }

  module.exports = {
    call: call
  };
}());
