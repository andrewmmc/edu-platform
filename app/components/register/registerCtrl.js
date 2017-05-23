app.controller('RegisterCtrl', function ($scope, $controller, $location, $http, $httpParamSerializer, store) {
	$controller('BaseCtrl', {$scope: $scope});

	/* Public functions */
	$scope.membersRegister = membersRegister;
	$scope.providersRegister = providersRegister;
	$scope.gov_registered = [
		{id: 0, name: '否'},
		{id: 1, name: '是'}
	];
	$scope.data = [];
	$scope.providers_register_data = {
		city_id: 1,
		gov_registered: $scope.gov_registered[0].id
	};
	/* Private functions */
	function providersRegister(data) {
		$http({
			method: 'POST',
			url: $scope.base_api_url + 'register/providers',
			data: $httpParamSerializer(data),
			headers: {'Content-Type': 'application/x-www-form-urlencoded'}
		})
			.success(function (data) {
					if (data.errors) {
						console.log(data.errors);
					} else {
						if ((data.status) && (data.status !== "failed")) {
							alert("成功註冊。請使用您的用戶名和密碼登入。");
							$location.path('/login/providers');
						} else {
							alert(data.message);
							console.log(data);
						}
					}
				}
			);
	}

	function membersRegister(data) {
		$http({
			method: 'POST',
			url: $scope.base_api_url + 'register/members',
			data: $httpParamSerializer(data),
			headers: {'Content-Type': 'application/x-www-form-urlencoded'}
		})
			.success(function (data) {
					if (data.errors) {
						console.log(data.errors);
					} else {
						if ((data.status) && (data.status !== "failed")) {
							alert("成功註冊。請使用您的用戶名和密碼登入。");
							$location.path('/login/members');
						} else {
							alert(data.message);
							console.log(data);
						}
					}
				}
			);
	}
});
