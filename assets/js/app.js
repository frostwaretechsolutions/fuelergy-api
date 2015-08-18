(function(){
  'use strict';
  var app = angular.module('fuelergy', ['ui.bootstrap']);

  /* CONTROLLERS */

  /* injects */
  var injects = {
    contact: [
      '$scope',
      '$http',
      ContactController
    ]
  };
  /* end injects */

  /* controllers */
  function ContactController($scope, $http){
    function init(){
      $scope.alerts = [];
    }
    function submitContact(){
      $http.post('/api/contact', $scope.contact).then(function success(data){
        $scope.alerts.push({ type: 'success', msg: 'Your message was successfully sent.'});
        $scope.contact = {}; 
      }, function error(data){
        $scope.alerts.push({ type: 'danger', msg: 'There was an error in sending your message.' });
        $scope.contact = {};
      });
    }

    function closeAlert(id){
      $scope.alerts.splice(id, 1);
    }
    
    $scope.init          = init
    $scope.submitContact = submitContact;
    $scope.closeAlert    = closeAlert;

    $scope.init();
  }
  /* end controllers */

  /* intialize */
  app.controller('ContactCtrl', injects.contact);
  /* end intialize */

  /* END CONTROLLERS */

  /* APP INIT */
  angular.element(document).ready(function(){
    angular.bootstrap(document, ['fuelergy']);
  });
  /* END APP INIT*/
}());
