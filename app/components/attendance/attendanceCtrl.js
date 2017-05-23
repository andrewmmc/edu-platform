app.controller('AttendanceCtrl', function ($rootScope, $scope, $controller, $filter, $http, $httpParamSerializer, store, $routeParams) {

	$controller('BaseCtrl', {$scope: $scope});
	/* General Settings */
	$scope.courses_id = $routeParams['coursesId'];
	$scope.courses = [];
	$scope.courses_lessons = [];
	$scope.lessons = [];
	$scope.new_lesson = [];
	$scope.postAttendance = postAttendance;
	$scope.postLessons = postLessons;
	$scope.postEditLessons = postEditLessons;
	getCourses();
	getLessons();
	getAttendance();

	/* Sidebar Menu Item */
	$scope.personal_menu = [
		{
			name: '返回課程管理',
			link: '#/providers/dashboard'
		},
		{
			name: '課堂列表',
			link: '#/providers/lessons/' + $scope.courses_id
		},
		{
			name: '相片',
			link: '#/providers/upload/' + $scope.courses_id
		},
		{
			name: '文件',
			link: '#/providers/documents/' + $scope.courses_id
		},
		{
			name: '出席清單',
			link: '#/providers/attendance/' + $scope.courses_id
		}
	];

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
							$scope.courses = data.data;
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
							$scope.courses_lessons = data.data;
						} else {
							console.log(data);
						}
					}
				}
			);
	}

	function postLessons(data) {
		$http({
			method: 'POST',
			url: $scope.base_api_url + 'providers/courses_lessons/',
			data: $httpParamSerializer({
				courses_id: $scope.courses_id,
				start_time: data['start_time'],
				end_time: data['end_time'],
				status: 1
			}),
			headers: {'Content-Type': 'application/x-www-form-urlencoded'}
		})
			.success(function (data) {
					if (data.errors) {
						console.log(data.errors);
					} else {
						if ((data.status) && (data.status === "success")) {
							getLessons();
							$(function () {
								$('#new_lesson').modal('hide');
							});
						}
						else {
							alert("未能更新紀錄。請確保填寫了課堂時間。");
							console.log(data);
						}
					}
				}
			);
	}

	function postEditLessons(data) {
		$http({
			method: 'POST',
			url: $scope.base_api_url + 'providers/edit_courses_lessons/',
			data: $httpParamSerializer({
				lessons_id: data['lessons_id'],
				start_time: data['start_time'],
				end_time: data['end_time'],
				status: 1
			}),
			headers: {'Content-Type': 'application/x-www-form-urlencoded'}
		})
			.success(function (data) {
					if (data.errors) {
						console.log(data.errors);
					} else {
						if ((data.status) && (data.status === "success")) {
							for ($j = 0; $j < $scope.lessons.length; $j++) {
								$scope.lessons[$j].edit = false;
							}
						}
						else {
							alert("未能更新紀錄。請確保修改了課堂時間。");
							console.log(data);
						}
					}
				}
			);
	}

	function getAttendance() {
		$http({
			method: 'GET',
			url: $scope.base_api_url + 'providers/attendance/' + $scope.courses_id,
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

	function postAttendance($courses_id, $lessons_id, $members_id) {
		$http({
			method: 'POST',
			url: $scope.base_api_url + 'providers/attendance/',
			data: $httpParamSerializer({
				courses_id: $courses_id,
				lessons_id: $lessons_id,
				members_id: $members_id,
				status: 1
			}),
			headers: {'Content-Type': 'application/x-www-form-urlencoded'}
		})
			.success(function (data) {
					if (data.errors) {
						console.log(data.errors);
					} else {
						if ((data.status) && (data.status !== "failed")) {
							getAttendance();
						} else {
							alert("未能更新紀錄。" + data.message);
							console.log(data);
						}
					}
				}
			);
	}
})
;
