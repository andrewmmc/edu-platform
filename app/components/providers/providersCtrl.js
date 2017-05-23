app.controller('ProvidersCtrl', function ($rootScope, $scope, $controller, $filter, $http, $httpParamSerializer, store) {

	$controller('BaseCtrl', {$scope: $scope});
	/* General Settings */

	$scope.gov_registered = [
		{id: 0, name: '否'},
		{id: 1, name: '是'}
	];

	$scope.courses = [];
	$scope.profile = [];
	$scope.password = [];
	$scope.transaction = [];
	$scope.lessons = [];
	$scope.courses2 = [];
	$scope.postProfile = postProfile;
	$scope.postCourses = postCourses;
	$scope.postPassword = postPassword;
	$scope.postLessons = postLessons;
	$scope.postAddCourses = postAddCourses;

	getCourses();
	getProfile();
	getTransaction();

	/* Sidebar Menu Item */
	$scope.personal_menu = [
		{
			name: '課程管理',
			link: '#/providers/dashboard'
		},
		{
			name: '交易紀錄',
			link: '#/providers/transaction-records'
		},
		{
			name: '服務提供者檔案',
			link: '#/providers/profile'
		}, {
			name: '變更密碼',
			link: '#/providers/password'
		}
	];

	/* Private functions */
	function getCourses() {
		$http({
			method: 'GET',
			url: $scope.base_api_url + 'providers/courses/' + $scope.user,
			headers: {'Content-Type': 'application/x-www-form-urlencoded'}
		})
			.success(function (data) {
					if (data.errors) {
						console.log(data.errors);
					} else {
						if ((data.status) && (data.status !== "failed")) {
							$scope.courses = data.data[0];
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
			url: $scope.base_api_url + 'providers/profile/' + $scope.user,
			headers: {'Content-Type': 'application/x-www-form-urlencoded'}
		})
			.success(function (data) {
					if (data.errors) {
						console.log(data.errors);
					} else {
						if ((data.status) && (data.status !== "failed")) {
							$scope.profile = data.data;
							$scope.password.providers_id = data.data.providers_id;
							$scope.profile.gov_registered = $scope.gov_registered[data.data.gov_registered].id;
							$scope.profile.city_id = $scope.city[data.data.city_id - 1].city_id;
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
			url: $scope.base_api_url + 'providers/transaction/' + $scope.user,
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
			url: $scope.base_api_url + 'providers/profile',
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

	function postCourses(data) {
		$http({
			method: 'POST',
			url: $scope.base_api_url + 'providers/edit_courses',
			data: $httpParamSerializer(data),
			headers: {'Content-Type': 'application/x-www-form-urlencoded'}
		})
			.success(function (data) {
					if (data.errors) {
						console.log(data.errors);
					} else {
						if ((data.status) && (data.status !== "failed")) {
							alert("成功變更課程資料。");
							$(function () {
								$('.modal').modal('hide');
							});
						} else {
							alert("未能變更課程資料。");
							console.log(data);
						}
					}
				}
			);
	}

	function postAddCourses(data) {
		data.providers_id = $scope.profile.providers_id;
		$http({
			method: 'POST',
			url: $scope.base_api_url + 'providers/courses',
			data: $httpParamSerializer(data),
			headers: {'Content-Type': 'application/x-www-form-urlencoded'}
		})
			.success(function (data) {
					if (data.errors) {
						console.log(data.errors);
					} else {
						if ((data.status) && (data.status !== "failed")) {
							alert("成功變更課程資料。");
							$(function () {
								$('.modal').modal('hide');
							});
						} else {
							alert("未能變更課程資料。");
							console.log(data);
						}
					}
				}
			);
	}

	function postLessons($courses_id, $start_time, $end_time, $status) {
		$http({
			method: 'POST',
			url: $scope.base_api_url + 'providers/courses_lessons',
			data: $httpParamSerializer({
				courses_id: $courses_id,
				start_time: $start_time,
				end_time: $end_time,
				status: $status
			}),
			headers: {'Content-Type': 'application/x-www-form-urlencoded'}
		})
			.success(function (data) {
					if (data.errors) {
						console.log(data.errors);
					} else {
						if ((data.status) && (data.status !== "failed")) {
							getCourses();
						} else {
							alert("未能變更。" + data.message);
							console.log(data);
						}
					}
				}
			);
	}

	function postPassword(data) {
		$http({
			method: 'POST',
			url: $scope.base_api_url + 'providers/password',
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
							$scope.password.providers_id = $scope.profile.providers_id;
						} else {
							alert("未能變更密碼。" + data.message);
							console.log(data);
						}
					}
				}
			);
	}
});
