/// <reference path="" />
var app = angular.module('app', ['ngRoute', 'uiGmapgoogle-maps']);


//Routing

app.config(function ($routeProvider) {
    $routeProvider

        // route for the home page
    .when('/', {
        templateUrl: 'views/main.html',
    }).when('/new', {
        templateUrl: 'views/news.html',
    }).when('/map', {
        templateUrl: 'views/map.html',

    });

    $routeProvider.otherwise({ redirectTo: "/" });
});



//Page Controllers

(function () {
    'use strict';

    app.controller('MainController', MainController);
    MainController.$inject = ['$scope'];

    function MainController($scope) {
        var vm = this;
        vm.title = "News";
        vm.pageTitle = "Auerfarm Mobile";

        function titleChange(input) {
            vm.pageTitle = input;
        };


    }


})();

(function () {
    'use strict';

    app.controller('NewsController', NewsController);
    NewsController.$inject = ['$scope'];

    function NewsController($scope) {
        var vm = this;
        vm.isLoaded = false;
        vm.title = "News";
        vm.showAll = true;

        vm.newsItems = {
            story1: { headline: "Punmpkin Pies on Sale", body: "Pies will be on sale starting on Tuesday.", date: "11/12/16" },
            story2: { headline: "Hike Scheduled for Friday", body: "Group hike scheduled for Friday. Dogs welcome.", date: "11/16/16" },
            story3: { headline: "School Trip on Monday", body: "Pies will be on sale starting on Tuesday. Pies will be on sale starting on Tuesday. Pies will be on sale starting on Tuesday. Pies will be on sale starting on Tuesday. Pies will be on sale starting on Tuesday. Pies will be on sale starting on Tuesday. Pies will be on sale starting on Tuesday. Pies will be on sale starting on Tuesday. Pies will be on sale starting on Tuesday. Pies will be on sale starting on Tuesday. Pies will be on sale starting on Tuesday. Pies will be on sale starting on Tuesday. Pies will be on sale starting on Tuesday. Pies will be on sale starting on Tuesday. Pies will be on sale starting on Tuesday.", date: "11/16/16", }
        };

        _.each(vm.newsItems, function (story) {
            story.showFull = false;
        });

        vm.toggleStory = function (story) {
            story.showFull = !story.showFull;
            vm.showAll = !vm.showAll;
        };

        vm.loadCheck = function () {
            if (document.readyState === "complete") {
                vm.isLoaded = true;
            };
        };
        vm.loadCheck();
    }


})();

(function () {
    'use strict';

    app.controller('MapController', MapController);
    MapController.$inject = ['$scope'];

    function MapController($scope) {
        var vm = this;
        vm.isLoaded = false;
        vm.map = { center: { latitude: 45, longitude: -73 }, zoom: 8 };
    }


})();


//data access
/*
$.ajax({
    type: "Post",
    url: "http://localhost:50409/Api/Data",
}).done(function (data) {
    alert(data);
}).error(function (jqXHR, textStatus, errorThrown) {
    alert(jqXHR);
});

*/

