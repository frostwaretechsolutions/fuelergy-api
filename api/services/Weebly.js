(function(){
  'use strict';

  var FeedParser = require('feedparser'),
      request    = require('request');


  function call(cb){
    var req = request('http://fuelergy.weebly.com/1/feed'),
        feedparser = new FeedParser({

        }),
        items = [];

    req.on('error', function(err){
    });

    req.on('response', function(res){
      var stream = this;

      if (res.statusCode != 200) return this.emit('error', new Error('Bad status code'));

      stream.pipe(feedparser)
    });

    feedparser.on('error', function(error){

    });

    feedparser.on('readable', function(){
      var stream = this,
          meta = this.meta,
          item;

      while(item = stream.read()) {
        items.push(item);
      }
          
    });

    feedparser.on('end', function(){
      cb(null, items);
    });
  }

  module.exports = {
    call: call
  };
}());
