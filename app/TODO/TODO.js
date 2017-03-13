'use strict';

var LIMIT = 5;
var HOUR = 60 * 60 * 1000;

angular.module('myApp.TODO', ['ngRoute', 'ngStorage', 'ui.bootstrap.datetimepicker'])
    .config([
        '$routeProvider', function ($routeProvider) {
            $routeProvider.when('/TODO', {
                templateUrl: 'TODO/TODO.html',
                controller: 'TODOCtrl'
            });
        }
    ])
    .controller('TODOCtrl', [
        '$scope', '$localStorage', function ($scope, $localStorage) {
            $scope.$storage = $localStorage;
            if (!$scope.$storage.todos) {
                $scope.$storage.todos = [];
            }
            $scope.limit = LIMIT;
            $scope.state = 'list';
            $scope.showAll = function ($event) {
                if ($scope.$storage.todos.length > $scope.limit) {
                    $scope.limit = $scope.$storage.todos.length;
                    $event.target.value = 'Collapse';
                } else {
                    $scope.limit = LIMIT;
                    $event.target.value = 'Show All';
                }
            };
            $scope.needShowAll = function (filterLength) {
                var todosLength = $scope.$storage.todos.length;
                return filterLength > $scope.limit || (filterLength == todosLength && todosLength > LIMIT)
            };
            $scope.addTodo = function () {
                if ($scope.state != 'add') {
                    $scope.state = 'add';
                    $scope.todo = {
                        done: false,
                        text: '',
                        reminderTime: new Date(new Date().setSeconds(0, 0) + HOUR)
                    };
                }
            };
            $scope.cancel = function () {
                $scope.state = 'list';
                $scope.todo = undefined;
            };
            $scope.save = function () {
                $scope.state = 'list';
                $scope.$storage.todos.push({
                    text: $scope.todo.text,
                    reminderTime: $scope.todo.reminderTime.toISOString(),
                    done: false
                });
                $scope.todo = undefined;
            };
            $scope.done = function () {
                $scope.$storage.todos = $scope.$storage.todos.filter(function (todo) {
                    return !todo.done;
                });
            };
        }
    ])
    .directive('ngValidateAfter', [function() {
        var validate_class = "nq-validate";
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function(scope, element, attrs, ctrl) {
                ctrl.validate = false;

                element.bind('focus', function(evt) {
                    if(ctrl.validate && ctrl.$invalid) // if we focus and the field was invalid, keep the validation
                    {
                        element.addClass(validate_class);
                        scope.$apply(function() {ctrl.validate = true;});
                    }
                    else
                    {
                        element.removeClass(validate_class);
                        scope.$apply(function() {ctrl.validate = false;});
                    }
                }).bind('blur', function(evt) {
                    element.addClass(validate_class);
                    scope.$apply(function() {ctrl.validate = true;});
                });
            }
        }
    }])
    .filter('currentdatetime', [
        '$filter', function ($filter) {
            return function () {
                return $filter('date')(new Date(), 'yyyy-MM-ddTHH:mm');
            };
        }
    ]);