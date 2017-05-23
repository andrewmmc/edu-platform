app.directive('transactionsList', function () {
		return {
			restrict: "E",
			replace: true,
			scope: {
				list: '=',
				caption: '@caption'
			},
			templateUrl: "app/common/providers/transactionList.html"
		}
	})
	.directive('transactions', function () {
		return {
			restrict: "EA",
			replace: true,
			scope: {
				transactions: '='
			},
			templateUrl: "app/common/providers/transaction.html"
		}
	})