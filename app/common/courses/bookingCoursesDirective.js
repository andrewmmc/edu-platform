app.directive('bookingCoursesList', function () {
		return {
			restrict: "E",
			replace: true,
			scope: {
				courses: '=',
				city: '=',
				category: '=',
				coursesDetails: '='
			},
			template: "<booking-course dir-paginate='course in courses | itemsPerPage: 5' course='course' city='city' category='category' coursesDetails='coursesDetails'></booking-course>"
		}
	})
	.directive('bookingCourse', function () {
		return {
			restrict: "E",
			replace: true,
			scope: {
				course: '=',
				city: '=',
				category: '=',
				coursesDetails: '='
			},
			templateUrl: "app/common/courses/bookingCourses.html"
		}
	})