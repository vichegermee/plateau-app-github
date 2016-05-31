/* 'use strict';
describe('Controller: plateauHeaderCtrl', function () {

	  // load the controller's module
	  beforeEach(module('plateauAppApp'));

	  var $controller;


	  // Initialize the controller and a mock scope
	  beforeEach(inject(function (_$controller_) {
		   $controller = _$controller_;
	  }));

	  it('afficheMenuAccueil should be default false', function() {
		  var $scope = {};
	      var controller = $controller('plateauHeaderCtrl', { $scope: $scope });
		  expect($scope.afficheMenuAccueil).toBe(false);
		});
	  
	  it('Affichage du menu de navigation entre les differents parties de l\'application. $scope.boutonRetour()', function() {
		  var $scope = {};
	      var controller = $controller('plateauHeaderCtrl', { $scope: $scope });
	      $scope.boutonRetour();
	      expect($scope.afficheMenuAccueil).toBe(true);
		});

		
	}); */