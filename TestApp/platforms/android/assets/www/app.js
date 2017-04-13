/// <reference path="" />
var app = angular.module('app', ['ngRoute', 'ngAnimate']);


//Routing

app.config(function ($routeProvider) {
    $routeProvider

        // route for the home page
    .when('/', {
        templateUrl: 'views/main.html',
    }).when('/news', {
        templateUrl: 'views/news.html',
    }).when('/map', {
        templateUrl: 'views/map.html',
    }).when('/eve', {
        templateUrl: 'views/events.html',
    }).when('/com', {
        templateUrl: 'views/forum.html',
    }).when('/sal', {
        templateUrl: 'views/shop.html',
    });

    $routeProvider.otherwise({ redirectTo: "/" });
});

//Page Controllers
(function () {
    'use strict';

    app.controller('MainController', MainController);
    MainController.$inject = ['$scope', '$location'];

    function MainController($scope, $location) {
        var vm = this;
        vm.title = "News";
        vm.pageTitle = "Auerfarm Mobile";
        vm.toggleMap = false;

        function titleChange(input) {
            vm.pageTitle = input;
        };

        vm.toggleMap = function () {
            vm.toggleMap = !vm.toggleMap;
        }
        vm.changeView = function (view) {
            $location.path(view); // path not hash
        }
    }
})();

(function () {
    'use strict';

    app.controller('NewsController', NewsController);
    NewsController.$inject = ['$scope', '$http'];

    function NewsController($scope, $http) {
        var vm = this;
        vm.isLoaded = false;
        vm.title = "News";
        vm.showAll = true;
        $http({
            url: "http://localhost:50409/Api/Data",
            method: "GET",
            params: { type: "News" }
        }).then(function mySucces(response) {
            vm.newsItems = response.data;
        }, function myError(response) {
        });

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
        $scope.map = { center: { latitude: 45, longitude: -73 }, zoom: 8 };
    }


})();

(function () {
    'use strict';

    app.controller('EventsController', EventsController);
    EventsController.$inject = ['$scope', '$http'];

    function EventsController($scope, $http) {
        var vm = this;
        vm.isLoaded = false;
        vm.title = "Events";
        vm.showAll = true;
        $http({
            url: "http://localhost:50409/Api/Data",
            method: "GET",
            params: { type: "Calendar" }
        }).then(function mySucces(response) {
            vm.events = response.data;
        }, function myError(response) {
        });

        _.each(vm.events, function (story) {
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

    app.controller('forumController', forumController);
    forumController.$inject = ['$scope', '$http'];

    function forumController($scope, $http) {
        var vm = this;
        vm.isLoaded = false;
        vm.title = "Forum";
        vm.showAll = true;
        $http({
            url: "http://localhost:50409/Api/Data",
            method: "GET",
            params: { type: "Comments" }
        }).then(function mySucces(response) {
            vm.comments = response.data;
        }, function myError(response) {
        });

        _.each(vm.comments, function (story) {
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

    app.controller('ShopController', ShopController);
    ShopController.$inject = ['$scope', '$http'];

    function ShopController($scope, $http) {
        var vm = this;
        vm.isLoaded = false;
        vm.title = "Shop";
        vm.showAll = true;
        $http({
            url: "http://localhost:50409/Api/Data",
            method: "GET",
            params: { type: "Shop" }
        }).then(function mySucces(response) {
            vm.saleItems = response.data;
        }, function myError(response) {
        });

        _.each(vm.saleItems, function (story) {
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