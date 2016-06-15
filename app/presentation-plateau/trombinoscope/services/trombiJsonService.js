(function(){
	'use strict';

/**
 * @ngdoc service
 * @name plateauAppApp.serviceSearchPatient
 * @description # serviceSearchPatient Factory in the plateauAppApp.
 */

angular
	.module('plateauAppApp')
		.service('trombiJsonService', trombiJsonService);
			trombiJsonService.$inject = ['$http'];
		function trombiJsonService($http) {
			var trombiService = this;
			
			trombiService.getCollaborateurs = function(){
				return $http({
					method: "GET",
					url: 'http://localhost:3001/collaborateurs/'
				});
				//.then(function successCallBack(response){
				//	return response;
				//});
			};
		}
})();