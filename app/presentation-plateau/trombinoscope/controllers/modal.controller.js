'use strict';
/**
 * @ngdoc controller
 * @name plateauAppApp.controller:ModalController
 * @description # Controlleur de la popup
 */
angular
		.module('plateauAppApp')

		.controller(
				'ModalController',
				[
						'$scope',
						'$element',
						'close',
						function($scope, close) {
							$scope.close = function(result) {
								close(result, 500);
							};
						} ]);