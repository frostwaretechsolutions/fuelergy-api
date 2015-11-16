(function(){
  'use strict';

  function job(agenda){
    var job = {
    
        name: 'Weebly',

        // method can be 'every <interval>', 'schedule <when>' or now
        frequency: 'every 5 seconds',

        // execute job
        run: function(job, done) {
            Weebly.call(function(err, items){
              BlogPost.findOne({ guid: items[0].guid }, function(err, post){
                if(post) {
                  sails.log.info('Weebly Already Sent');
                  done()
                } else {
                  BlogPost.create({ guid: items[0].guid }, function(err, post){
                    if(err) {
                      sails.log.error(err);
                      done();
                    } else {
                      NewsletterSend.call(function(err){
                        if(err) sails.log.error('Weebly Not Sent');
                        sails.log.info('Weebly Sent');
                        done();
                      });
                    }
                  });
                }
              });
            });
        },
    };
    return job;
  }

  module.exports = job;
}());
