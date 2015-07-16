(function(){
  'use strict';

  function call(message, status){
    var err = new Error(message);
    err.status = status;
    return err;
  }

  module.exports = {
    call: call
  };
}());
