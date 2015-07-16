describe('UserUpdate', function(){
  context('#call', function(){
    beforeEach(function(done){
      req.params.id = 1;
      req.params.all = function(){
        return { id: 1 };
      };
      done();
    });
    afterEach(function(done){
      req.params = {};
      done();
    });
    context('update error', function(){
      beforeEach(function(done){
        mocky.stub(User, 'update').withArgs({id:1},{id:1}).yields('error');
        done();
      });
      afterEach(function(done){
        User.update.restore();
        done();
      });
    
      it('should respond with error', function(done){
        UserUpdate.call(req, function(err, user){
          expect(err).to.equal('error');
          expect(user).to.be.undefined;
          done();
        });
      });
    });
    context('update succeed', function(){
      context('user not found', function(){
        beforeEach(function(done){
          mocky.stub(User, 'update').withArgs({id:1},{id:1}).yields(null, []);
          done();
        });
        afterEach(function(done){
          User.update.restore();
          done();
        });
        it('should respond with error', function(done){
          UserUpdate.call(req, function(err, user){
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
          mocky.stub(User, 'update').withArgs({id:1},{id:1}).yields(null, [{ username: 'lukeskywalker' }]);
          done();
        });
        afterEach(function(done){
          User.update.restore();
          done();
        });

        it('should respond with user', function(done){
          UserUpdate.call(req, function(err, user){
            expect(err).to.be.null;
            expect(user).to.deep.equal({ username: 'lukeskywalker' });
            done();
          });
        });
      });
    });
  });
});
