/// <reference path="" />
var app = angular.module('app', ['ngRoute']);

//Page Controllers

(function () {
    'use strict';

    app.controller('NewsController', NewsController);
    NewsController.$inject = ['$scope'];

    function NewsController($scope) {
        var vm = this;
        vm.title = "News";
        vm.newsItems = {
            story1: { headline: "Punmpkin Pies on Sale", body: "Pies will be on sale starting on Tuesday.", date: "11/12/16" },
            story2: { headline: "Hike Scheduled for Friday", body: "Group hike scheduled for Friday. Dogs welcome.", date: "11/16/16" },
            story3: { headline: "School Trip on monday", body: "Group hike scheduled for Friday. Dogs welcome.", date: "11/16/16" }
        };
    }

})();

//Routing

app.config(function ($routeProvider) {
    $routeProvider

        // route for the home page
    .when('/', {
        templateUrl: 'views/main.html',
    }).when('/news', {
        templateUrl: 'views/news.html',

    });

    $routeProvider.otherwise({ redirectTo: "/" });
});