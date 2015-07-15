describe('Update Stations', function(){
  context('#call', function(){
    var result;
    beforeEach(function(done){
      result = { 
        id: 1,
        station: 'Name1'
      };
      req.params = {
        apiKey: 1,
        stationid: 2,
        fueltype: 3,
        price: 4
      };
      done();
    });
    context('gasFeed#fails', function(){
      beforeEach(function(done){
        nock('http://api.mygasfeed.com').post('/locations/price/1.json').replyWithError('Just the worst');
        done();
      });
      it('should respond with error', function(done){
        UpdateStation.call(req, function(err, station){
          expect(err.message).to.equal('Just the worst');
          expect(station).to.be.undefined;
          done();
        });
      });
    });
    context('gasFeed#succeeds', function(){
      beforeEach(function(done){
        nock('http://api.mygasfeed.com').post('/locations/price/1.json').reply(200, result);
        done();
      });
      it('should respond with stations', function(done){
        UpdateStation.call(req, function(err, station){
          expect(err).to.be.null;
          expect(JSON.parse(station)).to.deep.equal(result);
          done();
        });
      });
    });
  });
});
