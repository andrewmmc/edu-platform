app.controller('HomeCtrl', function ($scope, $controller, $location) {
	$controller('BaseCtrl', {$scope: $scope});

	/* General Settings */
	
	$scope.keyword;
	$scope.search = search;
	/* Sidebar Menu Item */
	$scope.aboutMenu = [
		{
			name: '說明',
			link: '#/faq'
		},
		{
			name: '關於我們',
			link: '#/about'
		},
		{
			name: '聯絡我們',
			link: '#/contact'
		}
	];

	function search() {
		$location.path('/search/' + $scope.keyword);
	}


});
