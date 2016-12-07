var app = angular.module('app', ['ngRoute']);

app.config(function ($routeProvider) {
    $routeProvider

        // route for the home page
    .when('/home', {
        templateUrl: 'app/View/landing.html',
        //controller: 'buttonController',
    }).when('/map', {
        templateUrl: 'app/View/map.html',
        //controller: 'buttonController',
    });
    ;
    $routeProvider.otherwise({ redirectTo: "/home" });
});

//Controllers

//BlankController
(function () {
    'use strict';

    app.controller('blankController', BlankController);
    BlankController.$inject = ['$scope'];

    function ButtonController($scope) {
        var vm = this;
        vm.var = false;
       

        function clickButton(input) {
            vm.output = !input;
        };

    }


})();

