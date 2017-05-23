app.directive('collection', function () {
		return {
			restrict: "E",
			replace: true,
			scope: {
				title: '@title',
				description: '@description',
				icon: '@icon',
				collection: '='
			},
			templateUrl: "app/common/sidebar/sidebar.html"
		}
	})

	.directive('member', function () {
		return {
			restrict: "E",
			replace: true,
			scope: {
				member: '='
			},
			template: "<li><a href='{{member.link}}'>{{member.name}}</a></li>"
		}
	})