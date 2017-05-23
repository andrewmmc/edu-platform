app.directive('paymentList', function () {
		return {
			restrict: "E",
			replace: true,
			scope: {
				transaction: '=',
				caption: '@caption'
			},
			templateUrl: "app/common/members/paymentList.html"
		}
	})
	.directive('payment', function () {
		return {
			restrict: "EA",
			replace: true,
			scope: {
				payment: '='
			},
			templateUrl: "app/common/members/payment.html"
		}
	})