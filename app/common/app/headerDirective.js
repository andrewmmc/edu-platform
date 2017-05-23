app.directive('header', function () {
	return {
		restrict: 'A',
		scope: {
			category: '=',
			user: '=',
			status: '=',
			type: '=',
			logout: '=',
			token: '=',
			username: '='
		},
		templateUrl: "app/common/app/header.html"
	}
});