var app = angular.module('app', ['ngRoute']);

$.ajax({
    type: "Post",
    url: "http://localhost:50409/Api/Data",
}).done(function (data) {
    alert(data);
}).error(function (jqXHR, textStatus, errorThrown) {
    alert(jqXHR);
});

