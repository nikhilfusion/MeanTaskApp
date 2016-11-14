angular.module('myApp')

.controller('verifieController', ['$scope', '$http', '$state', function($scope, $http, $state) {
  var verifieDt = $state.params;
  if(verifieDt.userId) {
    var verifieObj = {
      userId : verifieDt.userId
    };
    $http.post('/verifie', verifieObj, {})
    .success(function (data) {
      console.log("data is", data);
      $scope.bg = 'green';
      $scope.msg = "Congrats! You have verified your account."
    })
    .error(function (data, status) {
      console.log("error ", data, status);
      $scope.bg = 'red';
      if(status === 403) {
        $scope.msg = "OOPS! You have already verified this account."  
      } else {
        $scope.msg = "OOPS! This account is invalid."  
      }
    });
  }   
}]);