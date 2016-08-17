var monApplication = angular.module("monApplication",[]);
            //scope est un module appertenant à angular(scope est le model)
            //création du controller dans le module
    //monApplication.controller("principalController",['$scope','$http',function($scope,$http){
monApplication.controller('todoCtrl', function($scope,$http) {
            //injection d'une dépendance: on ne gère pas la durée de vie d'un objet
            $http.get("../json/content.json").success(function(response) {
                $scope.todoList = [];
                $scope.todoList.push({todoText:"Faire les courses", done:false});
                $scope.todoList.push({todoText:"Faire le tp", done:false});
                $scope.todoList.push({todoText:"Regarder un manga", done:false});

            });

            $scope.todoAdd = function() {
                $scope.todoList.push({todoText:$scope.todoInput, done:false});
                $scope.todoInput = "";
            };

            $scope.remove = function() {
                var oldList = $scope.todoList;
                $scope.todoList = [];
                angular.forEach(oldList, function(x) {
                    if (!x.done) $scope.todoList.push(x);
                });
            };  
});