describe('UserLogin', function(){
  context('#call', function(){
    beforeEach(function(done){
      req.params.username = 'lukeskywalker';
      req.params.password = 'usetheforce';
      done();
    });
    afterEach(function(done){
      req.params = {};
      done();
    });
    context('findOne error', function(){
      beforeEach(function(done){
        mocky.stub(User, 'findOne').withArgs({ username: 'lukeskywalker', password: 'usetheforce' }).yields('error');
        done();
      });
      afterEach(function(done){
        User.findOne.restore();
        done();
      });
    
      it('should respond with error', function(done){
        UserLogin.call(req, function(err, user){
          expect(err).to.equal('error');
          expect(user).to.be.undefined;
          done();
        });
      });
    });
    context('findOne succeed', function(){
      context('user not found', function(){
        beforeEach(function(done){
          mocky.stub(User, 'findOne').withArgs({ username: 'lukeskywalker', password: 'usetheforce' }).yields(null, null);
          done();
        });
        afterEach(function(done){
          User.findOne.restore();
          done();
        });
        it('should respond with error', function(done){
          UserLogin.call(req, function(err, user){
            var newErr = new Error('User not found');
            newErr.status = 404;
            expect(err).to.deep.equal(newErr);
            expect(user).to.be.undefined;
            done();
          });
        });
      });
      context('user found', function(){
        beforeEach(function(done){
          mocky.stub(User, 'findOne').withArgs({ username: 'lukeskywalker', password: 'usetheforce' }).yields(null, { username: 'lukeskywalker' });
          done();
        });
        afterEach(function(done){
          User.findOne.restore();
          done();
        });

        it('should respond with user', function(done){
          UserLogin.call(req, function(err, user){
            expect(err).to.be.null;
            expect(user).to.deep.equal({ username: 'lukeskywalker' });
            done();
          });
        });
      });
    });
  });
});
