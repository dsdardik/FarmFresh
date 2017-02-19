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