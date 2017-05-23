app.directive('dashboardHead', function () {
	return {
		restrict: 'E',
		scope: {
			title: '@title',
			description: '@description'
		},
		templateUrl: "app/common/app/dashboardHead.html"
	}
});