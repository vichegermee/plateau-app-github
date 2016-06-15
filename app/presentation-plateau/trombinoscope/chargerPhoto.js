(function(){
	angular.module('plateauAppApp')
		.directive('chargerPhoto', chargerPhoto);
		function chargerPhoto() {
			return {
				restrict: 'A',
				require: '?ngModel',
				link: function ($scope, element, attrs, ngModel) {
					if (!ngModel) {
						return;
					}

					ngModel.$render = angular.noop;

					element.bind('change', function (event) {
						ngModel.$setViewValue(event.target.files[0]);
						$scope.$apply();
					});
				}
			};
		}
})();
