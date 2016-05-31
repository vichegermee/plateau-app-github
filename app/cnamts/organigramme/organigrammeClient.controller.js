(function(){
	'use strict';
	angular.module('plateauAppApp.controllers')
		   .controller('organigrammeClientCtrl',['$scope','$http',organigrammeClientCtrl]);
	function organigrammeClientCtrl($scope,$http){
		$scope.title = "Organisation de la Caisse nationale de l'assurance Maladie";
	}
})();



