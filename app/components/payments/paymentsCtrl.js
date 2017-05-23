app.controller('PaymentsCtrl', function ($rootScope, $scope, $controller, $location, $routeParams, $http, $httpParamSerializer, store) {
	/* General Settings */
	$controller('BaseCtrl', {$scope: $scope});
	$scope.courses_id = $routeParams['coursesId'];
	//$scope.login = {};
	$scope.course = {};
	$scope.lessons = {};
	$scope.providers = {};
	$scope.payment = {
		courses_id: $scope.courses_id,
		members_id: $scope.user,
		providers_id: $scope.course.providers_id
	};
	getCourses();
	getLessons();

	/* Public functions */
	$scope.membersLoginPayment = membersLoginPayment;
	$scope.membersRegisterPayment = membersRegisterPayment;
	$scope.payments = payments;

	/* Private functions */
	function membersLoginPayment(data) {
		$http({
			method: 'POST',
			url: $scope.base_api_url + 'login/members',
			data: $httpParamSerializer(data),
			headers: {'Content-Type': 'application/x-www-form-urlencoded'}
		})
			.success(function (data) {
					if (data.errors) {
						console.log(data.errors);
					} else {
						if ((data.status) && (data.status !== "failed")) {
							store.set('user', data.id);
							store.set('type', 'members');
							store.set('token', data.token);
							$location.path('/payments/' + $scope.courses_id);
						} else {
							alert("未能登入。請檢查您的用戶名和密碼是否正確。");
							console.log(data);
						}
					}
				}
			);
	}

	function membersRegisterPayment() {
		$location.path('/register/members');
	}

	function payments(data) {
		$http({
			method: 'POST',
			url: $scope.base_api_url + 'payment',
			data: $httpParamSerializer(data),
			headers: {'Content-Type': 'application/x-www-form-urlencoded'}
		})
			.success(function (data) {
					if (data.errors) {
						console.log(data.errors);
					} else {
						if ((data.status) && (data.status !== "failed")) {
							$location.path('/payments/successful/' + $scope.courses_id);
						} else {
							alert(data.message);
							$location.path('/payments/failure/' + $scope.courses_id);
							console.log(data);
						}
					}
				}
			);
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
							$scope.payment.providers_id = data.data.providers_id;
							getProviders();
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
