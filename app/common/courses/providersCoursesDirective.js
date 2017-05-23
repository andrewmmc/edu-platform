app.directive('providersCoursesList', function () {
	return {
		restrict: "E",
		replace: true,
		scope: {
			courses: '=',
			city: '=',
			category: '=',
			coursesDetails: '=',
			postCourses: '='
		},
		template: "<providers-course dir-paginate='course in courses | itemsPerPage: 5' city='city' post-courses='postCourses' lessons='lessons' course='course' category='category' coursesDetails='coursesDetails'></providers-course>"
	}
})
	.directive('providersCourse', function () {
		return {
			restrict: "E",
			replace: true,
			scope: {
				course: '=',
				city: '=',
				category: '=',
				coursesDetails: '=',
				postCourses: '='
			},
			templateUrl: "app/common/courses/providersCourses.html"
		}
	})