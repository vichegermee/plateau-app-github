angular.module('plateauAppApp').controller('confirmationCtrl', function($scope, $window, $uibModalInstance,$http,nouveauCollab) {
	
	//Initialisation des variables
	$scope.nouveauCollab = nouveauCollab;
	$scope.confirmer = function() {	
		$http.post('http://localhost:3001/collaborateurs', nouveauCollab).success(function(data,status){
			$scope.message = data;
			//console.log($scope.message);
		}).error(function(data, status, headers, config){
			alert("failure message: "+ JSON.stringify({data : data}));
		});
		$uibModalInstance.close();
		$window.location.reload();
	};
	$scope.cancel = function() {
		$uibModalInstance.dismiss('cancel');
		$window.location.reload();
	};
});