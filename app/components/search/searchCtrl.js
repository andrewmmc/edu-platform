app.controller('SearchCtrl', function ($rootScope, $scope, $controller, $location, $routeParams, $http, $httpParamSerializer, store) {
	/* General Settings */
	$controller('BaseCtrl', {$scope: $scope});
	
	$scope.keyword = $routeParams['keyword'];
	if ($scope.keyword.substring(0, 3) == "cat") {
		$scope.keyword = $scope.keyword.substring(3);
		catSearch();
	} else {
		postSearch();
	}
	/* Courses result */
	$scope.courses = [];

	function postSearch() {
		$http({
			method: 'POST',
			url: $scope.base_api_url + 'search',
			data: $httpParamSerializer({
				title: $scope.keyword
			}),
			headers: {'Content-Type': 'application/x-www-form-urlencoded'}
		})
			.success(function (data) {
					if (data.errors) {
						console.log(data.errors);
					} else {
						if ((data.status) && (data.status !== "failed")) {
							$scope.courses = data.data;
						} else {
							console.log(data);
						}
					}
				}
			);
	}

	function catSearch() {
		$http({
			method: 'POST',
			url: $scope.base_api_url + 'search',
			data: $httpParamSerializer({
				category_id: $scope.keyword
			}),
			headers: {'Content-Type': 'application/x-www-form-urlencoded'}
		})
			.success(function (data) {
					if (data.errors) {
						console.log(data.errors);
					} else {
						if ((data.status) && (data.status !== "failed")) {
							$scope.courses = data.data;
						} else {
							console.log(data);
						}
					}
				}
			);
	}
});
