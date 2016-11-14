angular.module('myApp')

.controller('homeController', ['$scope', '$http', '$state', function($scope, $http, $state) {
  function refresh() {
    $http.get('/user').success(function(res){
      $scope.userList = res;
    }, function(err) {
      console.log("err is", err);
    });
  };
  refresh();
  $scope.addUser = function(userInfo) {
    console.log("userInfo", userInfo);
    userInfo.is_verified = false;
    userInfo.del_flg = false;
    $http.post('/user', userInfo, {})
    .success(function (data, status) {
      $scope.user = {};
      refresh();
    })
    .error(function (data, status) {
    });
  };
}]);