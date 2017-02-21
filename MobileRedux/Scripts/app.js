var app = angular.module('app', ['ngRoute']);

app.config(function ($routeProvider) {
    $routeProvider

        // route for the home page
        .when('/', {
            templateUrl: 'landing.html',
            //controller: 'buttonController',
        }).when('/map', {
            templateUrl: 'map.html',
            //controller: 'buttonController',
        }).when('/news', {
            templateUrl: 'news.html',

        });

    $routeProvider.otherwise({ redirectTo: "/" });
});


