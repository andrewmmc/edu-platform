app.controller('UploadCtrl', function (Upload, $rootScope, $scope, $controller, $filter, $http, $httpParamSerializer, store, $routeParams) {

	$controller('BaseCtrl', {$scope: $scope});
	/* General Settings */
	$scope.courses_id = $routeParams['coursesId'];
	$scope.courses_photos = [];

	getPhotos();
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

	$scope.submit = function () {
		if ($scope.form.file.$valid && $scope.file) {
			$scope.upload($scope.file);
		}
	};

	$scope.upload = function (file) {
		Upload.upload({
			url: $scope.base_api_url + 'providers/upload',
			data: {file: file}
		}).then(function (resp) {
			console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' +
				resp.data);
			postCoursesPhotos($scope.courses_id, resp.data.data);
		}, function (resp) {
			console.log('Error status: ' + resp.status);
		}, function (evt) {
			var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
			console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
		});
	};

	/* Private functions */
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
							$scope.courses_photos = data.data;
						} else {
							console.log(data);
						}
					}
				}
			);
	}

	function postCoursesPhotos($courses_id, $path) {
		$http({
			method: 'POST',
			url: $scope.base_api_url + 'providers/courses_photos',
			data: $httpParamSerializer({
				courses_id: $courses_id,
				path: $path
			}),
			headers: {'Content-Type': 'application/x-www-form-urlencoded'}
		})
			.success(function (data) {
					if (data.errors) {
						console.log(data.errors);
					} else {
						if ((data.status) && (data.status !== "failed")) {
							getPhotos();
							$(function () {
								$('.modal').modal('hide');
							});
						} else {
							alert('上傳失敗，請檢查文件是否正確。');
						}
					}
				}
			);
	}
})
;
