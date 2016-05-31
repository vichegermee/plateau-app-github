(function(){
	'use strict';
	angular
		.module('plateauAppApp')
		.controller('dirPoleOuestCtrl',dirPoleOuestCtrl);
			function dirPoleOuestCtrl($rootScope){
				var vm=this;
				vm.title = "Organisation direction pole ouest";

			}
})();
