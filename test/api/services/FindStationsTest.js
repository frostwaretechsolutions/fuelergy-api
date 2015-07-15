describe('Find Stations', function(){
  context('#call', function(){
    var results, nocked;
    beforeEach(function(done){
      results = [
        { id: 1, station: 'Name1' },
        { id: 2, station: 'Name2' }
      ];
      req.params = {
        lat:    1,
        lng:    2,
        dist:   3,
        type:   4,
        sort:   5,
        apiKey: 6
      };
      nocked = nock('http://api.mygasfeed.com');
      done();
    });
    context('gasFeed#fails', function(){
      beforeEach(function(done){
        nocked.get('/stations/radius/1/2/3/4/5/6.json').replyWithError('Just the worst');
        done();
      });
      it('should respond with error', function(done){
        FindStations.call(req, function(err, stations){
          expect(err.message).to.equal('Just the worst');
          expect(stations).to.be.undefined;
          done();
        });
      });
    });
    context('gasFeed#succeeds', function(){
      beforeEach(function(done){
        nocked.get('/stations/radius/1/2/3/4/5/6.json').reply(200, results);
        done();
      });
      it('should respond with stations', function(done){
        FindStations.call(req, function(err, stations){
          expect(err).to.be.null;
          expect(stations).to.deep.equal(results);
          done();
        });
      });
    });
  });
});
