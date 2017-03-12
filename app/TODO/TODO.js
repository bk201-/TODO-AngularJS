'use strict';

var LIMIT = 5;
var HOUR = 60*60*1000;

angular.module('myApp.TODO', ['ngRoute', 'ngStorage', 'ui.bootstrap.datetimepicker'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/TODO', {
    templateUrl: 'TODO/TODO.html',
    controller: 'TODOCtrl'
  });
}])

.controller('TODOCtrl', ['$scope', '$localStorage', function($scope, $localStorage) {
  $scope.$storage = $localStorage;
  if (!$scope.$storage.todos) {
    $scope.$storage.todos = [];
  }
  $scope.limit = LIMIT;
  $scope.state = 'list';
  $scope.showAll = function($event) {
    if ($scope.$storage.todos.length > $scope.limit) {
      $scope.limit = $scope.$storage.todos.length;
      $event.target.value = 'Collapse';
    } else {
      $scope.limit = LIMIT;
      $event.target.value = 'Show All';
    }
  };
  $scope.needShowAll = function(filterLength) {
    var todosLength = $scope.$storage.todos.length;
    return filterLength > $scope.limit || (filterLength == todosLength && todosLength > LIMIT)
  };
  $scope.addTodo = function() {
    if ($scope.state != 'add') {
      $scope.state = 'add';
      $scope.todo = {
        done: false,
        text: '',
        reminderTime: new Date(new Date().setSeconds(0, 0) + HOUR)
      };
    }
  };
  $scope.cancel = function() {
    $scope.state = 'list';
    $scope.todo = undefined;
  };
  $scope.save = function() {
    $scope.state = 'list';
    $scope.$storage.todos.push({
      text: $scope.todo.text,
      reminderTime: $scope.todo.reminderTime.toISOString(),
      done: false
    });
    $scope.todo = undefined;
  };
  $scope.done = function() {
    $scope.$storage.todos = $scope.$storage.todos.filter(function(todo) {
      return !todo.done;
    });
  };
}])

.filter('currentdatetime',['$filter',  function($filter) {
  return function() {
    return $filter('date')(new Date(), 'yyyy-MM-ddTHH:mm');
  };
}]);