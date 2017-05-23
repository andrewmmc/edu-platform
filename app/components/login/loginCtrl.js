app.controller('LoginCtrl', function ($scope, $controller, $location, $http, $httpParamSerializer, store) {
	$controller('BaseCtrl', {$scope: $scope});

	/* Public functions */
	$scope.membersLogin = membersLogin;
	$scope.providersLogin = providersLogin;
	$scope.data = [];

	/* Private functions */
	function providersLogin(data) {
		$http({
			method: 'POST',
			url: $scope.base_api_url + 'login/providers',
			data: $httpParamSerializer(data),
			headers: {'Content-Type': 'application/x-www-form-urlencoded'}
		})
			.success(function (data) {
					if (data.errors) {
						console.log(data.errors);
					} else {
						if ((data.status) && (data.status !== "failed")) {
							store.set('user', data.id);
							store.set('username', data.username);
							store.set('type', 'providers');
							store.set('token', data.token);
							$location.path('/providers/dashboard');
						} else {
							alert("未能登入。請檢查您的用戶名和密碼是否正確。");
							console.log(data);
						}
					}
				}
			);
	}

	function membersLogin(data) {
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
							store.set('username', data.username);
							store.set('type', 'members');
							store.set('token', data.token);
							$location.path('/members/dashboard');
						} else {
							alert("未能登入。請檢查您的用戶名和密碼是否正確。");
							console.log(data);
						}
					}
				}
			);
	}

});
