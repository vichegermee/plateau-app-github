(function(){

	'use strict';
	/**
	 * @ngdoc controller
	 * @name plateauAppApp.controller:trombiJsonCtrl
	 * @description trombiJsonCtrl récupère ttableauSansDoublon ce qui se trouve dans le trombinoscope.json 
	 *              classe par fonction
	 *              et les stckent dans un tableau 
	 */
	angular
		.module('plateauAppApp')
			.controller('trombiJsonCtrl', ['$scope','$http',trombiJsonCtrl]);

	function trombiJsonCtrl($scope, $http){
		$scope.collaborateurs = [];
		$scope.fonctionsAAfficher = [];
		$scope.personnes = {};
		$scope.count=0;
		getData();
	
		/**
		 * @ngdoc function
		 * @name getData
		 * @desc Fonction principale qui récupère les données de trombinoscope.json, appelle ttableauSansDoublones les autres fonctions
		 */
		 
		function getData(){
			$http.get('../../data/trombinoscope.json').success(function(data){
				
				$scope.collaborateurs = data.collaborateurs;
				$scope.count = $scope.collaborateurs.length;
		
				for(var j=0; j < $scope.count; j++){
					var collaborateur = $scope.collaborateurs[j];
					var collaborateursfonction = getCollaborateurs(collaborateur);
					var fonctions = {
						libFonction: "",
						isCollapsed: false
					};
					fonctions.libFonction = collaborateur.fonction.codeFonction;
					$scope.fonctionsAAfficher.push(fonctions);
					collaborateursfonction.push(collaborateur);
				}
				$scope.fonctionsAAfficher = cleanDoublon($scope.fonctionsAAfficher);
			});
		};
		
		
		/**
		 * @ngdoc function
		 * @name openCollapse
		 * @desc Fonction permettant d'ouvrir tous les collapses fermés
		 */
		
		$scope.openCollapse = function (){
			$scope.isCollapsedOpen = false;
			for(var i = 0; i<$scope.fonctionsAAfficher.length; i++){
				$scope.fonctionsAAfficher[i].isCollapsed = false;
			}
			return $scope.fonctionsAAfficher;
		}
		
		/**
		 * @ngdoc function
		 * @name closeCollapse
		 * @desc Fonction permettant de fermer tous les collapses ouverts
		 */
		
		$scope.closeCollapse = function (){
			$scope.isCollapsed = true;
			for(var i = 0; i<$scope.fonctionsAAfficher.length; i++){
				$scope.fonctionsAAfficher[i].isCollapsed = true;
			}
			return $scope.fonctionsAAfficher;
		}
		/**
		 * @ngdoc function
		 * @name getCollaborateurs
		 * @desc Fonction permettant de classer les collaborateurs par fonction
		 * @param {object} le collaborateur j envoyé
		 * @returns {object} collaborateur par fonction
		 */
		 
		function getCollaborateurs(collaborateur){
			var collaborateursfonction = $scope.personnes[collaborateur.fonction.codeFonction];
			if(!collaborateursfonction){
				$scope.personnes[collaborateur.fonction.codeFonction] = [];
				collaborateursfonction = $scope.personnes[collaborateur.fonction.codeFonction];
			}
			return collaborateursfonction;
		}
		
		/**
		 * @ngdoc function
		 * @name cleanDoublon
		 * @desc Fonction permettant d'éliminer des doublons
		 * @param {array} tableau avec doublons
		 * @returns {array} tableau Sans Doublon
		 */
		 
		function cleanDoublon(fonctionsAAfficher) {
			var len = fonctionsAAfficher.length, tableauSansDoublon = [], obj1 = {};
			for (var i = 0; i < len; i++) {
				obj1[fonctionsAAfficher[i].libFonction] = "";
				
			}
			for (var j in obj1) {
				var obj2 = {
					libFonction: "",
					isCollapsed: false
				};
				obj2.libFonction = j;
				tableauSansDoublon.push(obj2);
			}			
			return tableauSansDoublon;
		}
	};
})();
