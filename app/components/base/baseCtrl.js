app.controller('BaseCtrl', function ($scope, $location, store, $http, $httpParamSerializer) {
	/* Global Settings */
	$scope.base_url = "http://localhost/edu-platform/";
	$scope.base_api_url = "http://localhost/edu-backend/api/";
	$scope.login_status = store.get('login_status');
	$scope.username = store.get('username');
	$scope.user = store.get('user');
	$scope.type = store.get('type');
	$scope.token = store.get('token');

	/* Common variables */
	$scope.category = [];
	$scope.city = [];

	/* Functions */
	getCity();
	getCategory();

	/* Public functions */
	$scope.logout = logout;

	/* Private functions */
	function logout() {
		store.remove('user');
		store.remove('token');
		store.remove('username');
		store.remove('type');
		$location.path('/');
	};

	function getCity() {
		$http({
			method: 'GET',
			url: $scope.base_api_url + 'city',
			//data: $httpParamSerializer({data}),
			headers: {'Content-Type': 'application/x-www-form-urlencoded'}
		})
			.success(function (data) {
					if (data.errors) {
						console.log(data.errors);
					} else {
						if ((data.status) && (data.status !== "failed")) {
							$scope.city = data.data;
							//console.log(data.message);
							//console.log($scope.city);
						} else {
							console.log(data);
						}
					}
				}
			);
	}

	function getCategory() {
		$http({
			method: 'GET',
			url: $scope.base_api_url + 'category',
			//data: $httpParamSerializer({data}),
			headers: {'Content-Type': 'application/x-www-form-urlencoded'}
		})
			.success(function (data) {
					if (data.errors) {
						console.log(data.errors);
					} else {
						if ((data.status) && (data.status !== "failed")) {
							$scope.category = data.data;
							//console.log(data.message);
							//console.log($scope.city);
						} else {
							console.log(data);
						}
					}
				}
			);
	}
});
