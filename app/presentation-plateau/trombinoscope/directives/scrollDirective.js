angular.module('plateauAppApp')
.directive('goTop', goTop);

	goTop.$inject = ['$location','$anchorScroll'];

	function goTop($location, $anchorScroll) {
		return {
			restrict: 'E',
			templateUrl : 'presentation-plateau/trombinoscope/go-top.html', 
			scope:{},
			link: function(scope,element,attrs) { 
				scope.id = "cRetour";
				
				scope.goToTop = function(){
					$location.hash('top');
					$anchorScroll();
				}
				
				window.onscroll = function(event){
					document.getElementById(scope.id).className = (window.pageYOffset > 100) ? "cVisible" : "cInvisible";
				}
			}
		};
	};