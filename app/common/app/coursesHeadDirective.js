app.directive('coursesHead', function () {
	return {
		restrict: 'E',
		scope: {
			title: '@title',
			description: '@description',
			category: '@category',
			color: '@color',
			location: '@location',
			courseDate: '@courseDate'
		},
		templateUrl: "app/common/app/coursesHead.html"
	}
});