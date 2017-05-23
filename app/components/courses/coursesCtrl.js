app.controller('CoursesCtrl', function ($rootScope, $scope, $controller, $location, $routeParams, $http, $httpParamSerializer, store) {
	/* General Settings */
	$controller('BaseCtrl', {$scope: $scope});
	$scope.photo_interval = 5000;
	$scope.courses_id = $routeParams['coursesId'];
	$scope.course = {};
	$scope.lessons = {};
	$scope.providers = {};
	getCourses();
	getLessons();

	/* Courses */
	$scope.course_photos = [{
		id: 0,
		path: 'http://dummyimage.com/600x400/000/fff',
		description: 'test'
	},
		{
			id: 1,
			path: 'http://dummyimage.com/600x400/fff/000',
			description: 'test'
		}];

	/* Public functions */
	$scope.subscribe = subscribe;

	/* Private functions */
	function subscribe(course_id) {
		if ($scope.user) {
			$location.path('/payments/' + course_id);
		} else {
			$location.path('/payments/login/' + course_id);
		}
	}

	/* Private functions */
	function getCourses() {
		$http({
			method: 'GET',
			url: $scope.base_api_url + 'courses/' + $scope.courses_id,
			headers: {'Content-Type': 'application/x-www-form-urlencoded'}
		})
			.success(function (data) {
					if (data.errors) {
						console.log(data.errors);
					} else {
						if ((data.status) && (data.status !== "failed")) {
							$scope.course = data.data;
							getProviders();
							getPhotos();
						} else {
							console.log(data);
						}
					}
				}
			);
	}

	function getPhotos() {
		$http({
			method: 'GET',
			url: $scope.base_api_url + 'courses/photos/' + $scope.courses_id,
			headers: {'Content-Type': 'application/x-www-form-urlencoded'}
		})
			.success(function (data) {
					if (data.errors) {
						console.log(data.errors);
					} else {
						if ((data.status) && (data.status !== "failed")) {
							$scope.course.photos = data.data;
						} else {
							console.log(data);
						}
					}
				}
			);
	}

	function getLessons() {
		$http({
			method: 'GET',
			url: $scope.base_api_url + 'courses/lessons/' + $scope.courses_id,
			headers: {'Content-Type': 'application/x-www-form-urlencoded'}
		})
			.success(function (data) {
					if (data.errors) {
						console.log(data.errors);
					} else {
						if ((data.status) && (data.status !== "failed")) {
							$scope.lessons = data.data;
						} else {
							console.log(data);
						}
					}
				}
			);
	}

	function getProviders() {
		$http({
			method: 'GET',
			url: $scope.base_api_url + 'providers/profile/' + $scope.course.providers_id,
			headers: {'Content-Type': 'application/x-www-form-urlencoded'}
		})
			.success(function (data) {
					if (data.errors) {
						console.log(data.errors);
					} else {
						if ((data.status) && (data.status !== "failed")) {
							$scope.providers = data.data;
						} else {
							console.log(data);
						}
					}
				}
			);
	}
});
