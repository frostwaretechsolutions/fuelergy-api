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
                  console.log('Weebly Already Sent');
                  done()
                } else {
                  BlogPost.create({ guid: items[0].guid }, function(err, post){
                    if(err) {
                      console.error(err);
                      done();
                    } else {
                      NewsletterSend.call(function(err){
                        if(err) console.error('Weebly Not Sent');
                        console.log('Weebly Sent');
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
