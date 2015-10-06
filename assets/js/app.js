(function(){
  'use strict';
  var app = angular.module('fuelergy', ['ui.bootstrap', 'duScroll']);

  /* CONTROLLERS */

  /* injects */
  var injects = {
    home: [
      '$scope',
      HomeCtrl
    ],
    about: [
      '$scope',
      AboutCtrl
    ],
    contact: [
      '$scope',
      '$http',
      ContactCtrl
    ]
  };
  /* end injects */

  /* controllers */

  function HomeCtrl($scope){
    function init(){
      $scope.links = {
        ios: 'http://itunes.com/apps/fuelergy',
        android: 'http://play.google.com/store/apps/details?id=fuelergy',
        windows: 'https://www.microsoft.com/store/apps/fuelergy'
      }
      var ua = navigator.userAgent;

      if(/Android/i.test(ua)){
        $scope.link = $scope.links.android;
      } else if(/iPhone|iPad|iPod/i.test(ua)){
        $scope.link = $scope.links.ios;
      } else if(/IEMobile/i.test(ua)){
        $scope.link = $scope.links.windows;
      } else {
        $scope.link = $scope.links.ios;
      }
    }

    $scope.init = init;

    $scope.init();
  }

  function AboutCtrl($scope){
    function init(){
      $scope.users = [
        {
          name: 'M. Elliot Frost',
          pic: 'elliot',
          title: 'Frostware CEO',
          handle: 'melliotfrost',
          linkedin: 'melliotfrost',
          github: 'frostme',
          description: 'Lead developer, founder, CEO... Elliot is fully invested in bringing the freshest tech innovations and ideas to the table. His creativity, curiosity, and experience are the catalysts that allow Fuelergy to adapt to stay on the cutting edge.'
        },{
          name: 'Kyle C. Goodbred',
          pic: 'kyle',
          title: 'Frostware CFO',
          handle: 'GBred65',
          linkedin: 'kylegoodbred',
          github: 'kgbred65',
          description: 'Marketer, analyst, CFO... Kyle is responsible for the business plan Fuelergy operates within. His passion for management, marketing, and customer satisfaction drive him in his work as part of the Fuelergy Team.'
        }
      ];
    }

    $scope.init = init;

    $scope.init();
  }

  function ContactCtrl($scope, $http){
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
  app.controller('HomeCtrl', injects.home);
  app.controller('AboutCtrl', injects.about);
  app.controller('ContactCtrl', injects.contact);
  /* end intialize */

  /* END CONTROLLERS */

  /* APP INIT */
  angular.element(document).ready(function(){
    angular.bootstrap(document, ['fuelergy']);
  });
  /* END APP INIT*/
}());
