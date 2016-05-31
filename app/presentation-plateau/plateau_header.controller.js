/**
 * @ngdoc controller
 * @name plateauAppApp.controller:plateauHeaderCtrl
 * @description #plateauHeaderCtrl Controlleur du header du module plateau
 *jshint latedef: nofunc */
 (function(){
	 'use strict';
	angular
		.module('plateauAppApp')
			.controller('plateauHeaderCtrl',plateauHeaderCtrl );
			
	/*jshint latedef: nofunc */
	function plateauHeaderCtrl($scope) {
		$scope.afficheMenuAccueilScope = false;
		/*jshint latedef: nofunc */
		afficheMenuAccueilFonction();
		/**
		 * @ngdoc function
		 * @name afficher_menu_accueil
		 * @desc Fonction permettant d'afficher le menu d'accès aux differentes parties de l'application au click de la souris sur le bouton de retour
		 */
		function afficheMenuAccueilFonction(){
			$scope.boutonRetour = function() {
			$scope.afficheMenuAccueil = !$scope.afficheMenuAccueil;
			};
		}
	}
 })();


