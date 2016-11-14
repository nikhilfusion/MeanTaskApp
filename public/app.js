angular.module('myApp', ['ui.router'])
.config(function($stateProvider, $urlRouterProvider) {    
  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'home.html',
      controller: 'homeController'
    })
    .state('verifie', {
      url: '/verifie?userId?timeStamp',
      templateUrl: 'verifie.html',
      controller: 'verifieController'
    })
  $urlRouterProvider.otherwise('/');
});