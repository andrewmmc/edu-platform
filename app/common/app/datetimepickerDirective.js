app.directive('datetimepicker', function () {
	return {

		restrict: 'A',
		// Always use along with an ng-model
		require: '?ngModel',

		link: function (scope, element, attrs, ngModel) {
			if (!ngModel) return;

			ngModel.$render = function () { //This will update the view with your model in case your model is changed by another code.
				element.datetimepicker('update', ngModel.$viewValue || '');
			};
			element.datetimepicker().on("dp.change", function (event) {
				scope.$apply(function () {
					ngModel.$setViewValue(moment(event.date).format('YYYY-MM-DD'));//This will update the model property bound to your ng-model whenever the datepicker's date changes.
				});
			});
		}
	};
});