require('../../support');

describe('UserController', function(){
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
    context('UserLogin#fails', function(){
      beforeEach(function(done){
        mocky.stub(UserLogin, 'call').withArgs(req).yields('error');
        done();
      });
      afterEach(function(done){
        UserLogin.call.restore();
        done();
      });

      it('should respond with error', function(done){
        UserController.login(req, res);
        expect(res.json.called).to.be.false;
        expect(res.negotiate.calledWith('error')).to.be.true;
        done();
      });
    });

    context('UserLogin#succeeds', function(){
      beforeEach(function(done){
        mocky.stub(UserLogin, 'call').withArgs(req).yields(null, 'results');
        done();
      });
      afterEach(function(done){
        UserLogin.call.restore();
        done();
      });

      it('should respond with results', function(done){
        UserController.login(req, res);
        expect(res.json.calledWith('results')).to.be.true;
        expect(res.negotiate.called).to.be.false;
        done();
      });
    });
  });
  context('#update', function(){
    context('UserUpdate#fails', function(){
      beforeEach(function(done){
        mocky.stub(UserUpdate, 'call').withArgs(req).yields('error');
        done();
      });
      afterEach(function(done){
        UserUpdate.call.restore();
        done();
      });

      it('should respond with error', function(done){
        UserController.update(req, res);
        expect(res.json.called).to.be.false;
        expect(res.negotiate.calledWith('error')).to.be.true;
        done();
      });
    });

    context('UserUpdate#succeeds', function(){
      beforeEach(function(done){
        mocky.stub(UserUpdate, 'call').withArgs(req).yields(null, ['results']);
        done();
      });
      afterEach(function(done){
        UserUpdate.call.restore();
        done();
      });

      it('should respond with results', function(done){
        UserController.update(req, res);
        expect(res.json.calledWith(['results'])).to.be.true;
        expect(res.negotiate.called).to.be.false;
        done();
      });
    });
  });
});
