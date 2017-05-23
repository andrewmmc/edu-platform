app.config(['$routeProvider', function ($routeProvider) {
	$routeProvider

	/* Home */
		.when("/", {
			templateUrl: "app/components/home/homeView.html",
			controller: "HomeCtrl"
		})

		/* Static Pages */
		.when("/faq", {
			templateUrl: "app/components/static/faqView.html",
			controller: "HomeCtrl"
		})
		.when("/about", {
			templateUrl: "app/components/static/aboutView.html",
			controller: "HomeCtrl"
		})
		.when("/contact", {
			templateUrl: "app/components/static/contactView.html",
			controller: "HomeCtrl"
		})

		/* Login & Register - Members */

		.when("/register/members", {
			templateUrl: "app/components/register/registerMembersView.html",
			controller: "RegisterCtrl"
		})
		.when("/login/members", {
			templateUrl: "app/components/login/loginMembersView.html",
			controller: "LoginCtrl"
		})

		/* Login & Register - Providers */
		.when("/register/providers", {
			templateUrl: "app/components/register/registerProvidersView.html",
			controller: "RegisterCtrl"
		})
		.when("/login/providers", {
			templateUrl: "app/components/login/loginProvidersView.html",
			controller: "LoginCtrl"
		})

		/* Search */
		.when("/search/:keyword", {
			templateUrl: "app/components/search/resultView.html",
			controller: "SearchCtrl"
		})

		/* Course Details */
		.when("/courses/:coursesId", {
			templateUrl: "app/components/courses/coursesView.html",
			controller: "CoursesCtrl"
		})

		/* Payments */
		.when("/payments/login/:coursesId", {
			templateUrl: "app/components/payments/loginView.html",
			controller: "PaymentsCtrl"
		})
		.when("/payments/register/:coursesId", {
			templateUrl: "app/components/register/registerMembersView.html",
			controller: "PaymentsCtrl"
		})
		.when("/payments/:coursesId", {
			templateUrl: "app/components/payments/paymentsView.html",
			controller: "PaymentsCtrl"
		})
		.when("/payments/successful/:coursesId", {
			templateUrl: "app/components/payments/successfulView.html",
			controller: "PaymentsCtrl"
		})
		.when("/payments/failure/:coursesId", {
			templateUrl: "app/components/payments/failureView.html",
			controller: "PaymentsCtrl"
		})

		/* Members */

		.when("/members/dashboard", {
			templateUrl: "app/components/members/dashboardView.html",
			controller: "MembersCtrl"
		})
		.when("/members/profile", {
			templateUrl: "app/components/members/profileView.html",
			controller: "MembersCtrl"
		})
		.when("/members/password", {
			templateUrl: "app/components/members/passwordView.html",
			controller: "MembersCtrl"
		})
		.when("/members/payment-records", {
			templateUrl: "app/components/members/paymentRecordsView.html",
			controller: "MembersCtrl"
		})

		/* Providers */

		.when("/providers/dashboard", {
			templateUrl: "app/components/providers/dashboardView.html",
			controller: "ProvidersCtrl"
		})
		.when("/providers/transaction-records", {
			templateUrl: "app/components/providers/transactionRecordsView.html",
			controller: "ProvidersCtrl"
		})
		.when("/providers/profile", {
			templateUrl: "app/components/providers/profileView.html",
			controller: "ProvidersCtrl"
		})
		.when("/providers/password", {
			templateUrl: "app/components/providers/passwordView.html",
			controller: "ProvidersCtrl"
		})

		/* Providers - Attendance / Lessons Management */

		.when("/providers/lessons/:coursesId", {
			templateUrl: "app/components/attendance/lessonsView.html",
			controller: "AttendanceCtrl"
		})
		.when("/providers/attendance/:coursesId", {
			templateUrl: "app/components/attendance/attendanceView.html",
			controller: "AttendanceCtrl"
		})
		.when("/providers/upload/:coursesId", {
			templateUrl: "app/components/upload/uploadView.html",
			controller: "UploadCtrl"
		})
		.when("/providers/documents/:coursesId", {
			templateUrl: "app/components/documents/documentsView.html",
			controller: "DocumentsCtrl"
		})

		/* Else 404 */
		.otherwise('/');
}]);