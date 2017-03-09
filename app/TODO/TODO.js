'use strict';

var LIMIT = 5;

angular.module('myApp.TODO', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/TODO', {
    templateUrl: 'TODO/TODO.html',
    controller: 'TODOCtrl'
  });
}])

.controller('TODOCtrl', ['$scope', function($scope) {
  $scope.todos = [
    {
      id: 1,
      done: false,
      text: 'TODO 1'
    }, {
      id: 2,
      done: false,
      text: 'TODO 2'
    }, {
      id: 3,
      done: false,
      text: 'TODO 3'
    }
  ];
  $scope.limit = LIMIT;
  $scope.state = 'list';
  $scope.showAll = function($event) {
    if ($scope.todos.length > $scope.limit) {
      $scope.limit = $scope.todos.length;
      $event.target.value = 'Collapse';
    } else {
      $scope.limit = LIMIT;
      $event.target.value = 'Show All';
    }
  };
  $scope.needShowAll = function(filterLength) {
    var todosLength = $scope.todos.length;
    return filterLength > $scope.limit || (filterLength == todosLength && todosLength > LIMIT)
  };
  $scope.addTodo = function() {
    $scope.state = 'add';
    $scope.todo = {};
  };
  $scope.cancel = function() {
    $scope.state = 'list';
    $scope.todo = undefined;
  };
  $scope.save = function() {
    $scope.state = 'list';
    $scope.todos.push({id: $scope.todos.length + 1, text: $scope.todo.text, done: false});
    $scope.todo = undefined;
  };
  $scope.done = function() {
    $scope.todos = $scope.todos.filter(function(todo) {
      return !todo.done;
    });
  };
  $scope.remaining = function() {
    var count = 0;
    $scope.todos.forEach(function(todo) {
      count += todo.done ? 1 : 0;
    });
    return count;
  };
}]);