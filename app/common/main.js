/**
 * @ngdoc controller
 * @name plateauAppApp.controller:MainCtrl
 * @description # MainCtrl Ce controlleur permet de controller les differents
 *              actions de l'utilisateur sur la page d'accueil et d'effectuer
 *              les operations appropriées
 */
 (function(){
	 'use strict';
	 angular
		.module('plateauAppApp')
		// on injecte $state dans toutes nos vues
			.run(
				[ '$rootScope', '$state', function($rootScope, $state) {
					$rootScope.$state = $state;
				} ])
				.controller('MainCtrl', MainCtrl);
				 /*jshint latedef: nofunc */
	function MainCtrl($scope) {
		$scope.messageMain = 'message main controller';
	}
 })();