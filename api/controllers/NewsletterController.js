(function(){
  'use strict';  

  function subscribe(req, res){
    SubscriptionCreate.call(req, function(err, subscription){
      if(err) return res.negotiate(err);
      res.ok();
    });
  }

  function send(req, res){
    NewsletterSend.call(req, function(err){
      if(err) return res.negotiate(err);
      res.ok();
    });

  }

  function unsubscribe(req, res){
    Unsubscribe.call(req, function(err, subscription){
      if(err) return res.negotiate(err);
      res.send('<html><body><h3>You are now unsubscribed from the Fuelergy newsletter.</h3></body></html>');
    });
  }

  module.exports = {
    subscribe:   subscribe,
    send:        send,
    unsubscribe: unsubscribe
  };
}());

