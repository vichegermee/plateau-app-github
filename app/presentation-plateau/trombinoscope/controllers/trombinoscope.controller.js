
(function(){
	'use strict';
	/**
	 * @ngdoc controller
	 * @name plateauAppApp.controller:trombinoscopeCtrl
	 * @description #trombinoscopeCtrl Ce controlleur permet de controller les
	 *              differents actions de l'utilisateur sur le trombinoscope du
	 *              plateau et d'effectuer les operations appropriées
	 */

	angular.module('plateauAppApp')
			.controller('trombinoscopeCtrl', trombinoscopeCtrl);
	function trombinoscopeCtrl() {
		/* jshint validthis: true */
		var vm = this;
		vm.showFonction=false;
		// on cache notre bouton
		show();

		/**
		 * @ngdoc function
		 * @name show
		 * @desc Fonction permettant d'afficher le detail d'un collaborateur
		 */
		function show(){
			vm.show=function(){
				vm.showFonction=!vm.showFonction;
			};
		}
	}
})();


