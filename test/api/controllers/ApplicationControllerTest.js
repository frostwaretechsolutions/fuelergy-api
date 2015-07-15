require('../../support');

describe('ApplicationController', function(){
  beforeEach(function(done){
    mocky.spy(res, 'json');
    mocky.spy(res, 'negotiate');
    done();
  });
  afterEach(function(done){
    res.json.restore();
    res.negotiate.restore();
    done();
  });

  context('#update', function(){
    context('mygas#fails', function(){
      beforeEach(function(done){
        mocky.stub(UpdateStation, 'call').withArgs(req).yields('error');
        done();
      });
      afterEach(function(done){
        UpdateStation.call.restore();
        done();
      });

      it('should respond with error', function(done){
        ApplicationController.update(req, res);
        expect(res.json.called).to.be.false;
        expect(res.negotiate.calledWith('error')).to.be.true;
        done();
      });
    });

    context('mygas#succeeds', function(){
      beforeEach(function(done){
        mocky.stub(UpdateStation, 'call').withArgs(req).yields(null, 'results');
        done();
      });
      afterEach(function(done){
        UpdateStation.call.restore();
        done();
      });

      it('should respond with results', function(done){
        ApplicationController.update(req, res);
        expect(res.json.calledWith('results')).to.be.true;
        expect(res.negotiate.called).to.be.false;
        done();
      });
    });
  });
  context('#stations', function(){
    context('mygas#fails', function(){
      beforeEach(function(done){
        mocky.stub(FindStations, 'call').withArgs(req).yields('error');
        done();
      });
      afterEach(function(done){
        FindStations.call.restore();
        done();
      });

      it('should respond with error', function(done){
        ApplicationController.stations(req, res);
        expect(res.json.called).to.be.false;
        expect(res.negotiate.calledWith('error')).to.be.true;
        done();
      });
    });

    context('mygas#succeeds', function(){
      beforeEach(function(done){
        mocky.stub(FindStations, 'call').withArgs(req).yields(null, ['results']);
        done();
      });
      afterEach(function(done){
        FindStations.call.restore();
        done();
      });

      it('should respond with results', function(done){
        ApplicationController.stations(req, res);
        expect(res.json.calledWith(['results'])).to.be.true;
        expect(res.negotiate.called).to.be.false;
        done();
      });
    });
  });
});
