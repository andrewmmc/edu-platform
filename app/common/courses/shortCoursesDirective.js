app.directive('shortCoursesList', function () {
		return {
			restrict: "E",
			replace: true,
			scope: {
				courses: '=',
				city: '=',
				category: '=',
				coursesDetails: '='
			},
			template: "<short-course dir-paginate='course in courses | itemsPerPage: 5' course='course' category='category' coursesDetails='coursesDetails'></short-course>"
		}
	})
	.directive('shortCourse', function () {
		return {
			restrict: "E",
			replace: true,
			scope: {
				course: '=',
				city: '=',
				category: '=',
				coursesDetails: '='
			},
			templateUrl: "app/common/courses/shortCourses.html"
		}
	})