
app.directive("newsItem", function () {
    return {
        scope: { flavor: '@' },
        template: '<div>{{flavor}}</div>'
    };
});