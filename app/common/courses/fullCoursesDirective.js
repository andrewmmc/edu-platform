app.directive('fullCoursesList', function () {
		return {
			restrict: "E",
			replace: true,
			scope: {
				courses: '=',
				city: '=',
				category: '=',
				coursesDetails: '='
			},
			template: "<full-course dir-paginate='course in courses | itemsPerPage: 5' city='city' course='course' category='category' coursesDetails='coursesDetails'></full-course>"
		}
	})
	.directive('fullCourse', function () {
		return {
			restrict: "E",
			replace: true,
			scope: {
				course: '=',
				city: '=',
				category: '=',
				coursesDetails: '='
			},
			templateUrl: "app/common/courses/fullCourses.html"
		}
	})