(function(){
  'use strict';

  function call(req){
    return ((req.host == 'localhost') ? ('localhost:' + req.port) : req.host);
  }

  module.exports = call;
}());
