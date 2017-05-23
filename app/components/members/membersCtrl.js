app.controller('MembersCtrl', function ($rootScope, $scope, $controller, $filter, $http, $httpParamSerializer, store) {

	$controller('BaseCtrl', {$scope: $scope});
	/* General Settings */
	
	$scope.personal_menu = [
		{
			name: '個人中心',
			link: '#/members/dashboard'
		},
		{
			name: '個人檔案',
			link: '#/members/profile'
		},
		{
			name: '變更密碼',
			link: '#/members/password'
		},
		{
			name: '付款紀錄',
			link: '#/members/payment-records'
		}
	];
	$scope.data = [];
	$scope.courses = [];
	$scope.profile = [];
	$scope.password = [];
	$scope.transaction = [];
	$scope.postProfile = postProfile;
	$scope.postPassword = postPassword;
	getCourses();
	getProfile();
	getTransaction();

	/* Private functions */
	function getCourses() {
		$http({
			method: 'GET',
			url: $scope.base_api_url + 'members/courses/' + $scope.user,
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

	function getProfile() {
		$http({
			method: 'GET',
			url: $scope.base_api_url + 'members/profile/' + $scope.user,
			headers: {'Content-Type': 'application/x-www-form-urlencoded'}
		})
			.success(function (data) {
					if (data.errors) {
						console.log(data.errors);
					} else {
						if ((data.status) && (data.status !== "failed")) {
							$scope.profile = data.data;
							$scope.password.members_id = data.data.members_id;
						} else {
							console.log(data);
						}
					}
				}
			);
	}

	function getTransaction() {
		$http({
			method: 'GET',
			url: $scope.base_api_url + 'members/transaction/' + $scope.user,
			headers: {'Content-Type': 'application/x-www-form-urlencoded'}
		})
			.success(function (data) {
					if (data.errors) {
						console.log(data.errors);
					} else {
						if ((data.status) && (data.status !== "failed")) {
							$scope.transaction = data.data;
						} else {
							console.log(data);
						}
					}
				}
			);
	}

	function postProfile(data) {
		$http({
			method: 'POST',
			url: $scope.base_api_url + 'members/profile',
			data: $httpParamSerializer(data),
			headers: {'Content-Type': 'application/x-www-form-urlencoded'}
		})
			.success(function (data) {
					if (data.errors) {
						console.log(data.errors);
					} else {
						if ((data.status) && (data.status !== "failed")) {
							alert("成功變更個人資料。");
						} else {
							alert("未能變更個人資料。");
							console.log(data);
						}
					}
				}
			);
	}

	function postPassword(data) {
		$http({
			method: 'POST',
			url: $scope.base_api_url + 'members/password',
			data: $httpParamSerializer(data),
			headers: {'Content-Type': 'application/x-www-form-urlencoded'}
		})
			.success(function (data) {
					if (data.errors) {
						console.log(data.errors);
					} else {
						if ((data.status) && (data.status !== "failed")) {
							alert("成功變更密碼。");
							$scope.password = [];
							$scope.password.members_id = $scope.profile.members_id;
						} else {
							alert("未能變更密碼。" + data.message);
							console.log(data);
						}
					}
				}
			);
	}

});
