app.directive('footer', function () {
    return {
        restrict: 'A',
        scope: {
            user: '='
        },
        templateUrl: "app/common/app/footer.html"
    }
});