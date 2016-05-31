'use strict';

/**
 * @ngdoc overview
 * @name plateauAppApp
 * @description #plateauAppApp
 * C'est le noyau de l'application.On y retrouve les differents etats ,services
 * et controllers de notre application
 */
	angular.module('d3', []);
	angular.module('plateauAppApp.controllers', []);
	angular.module('plateauAppApp.directives', ['d3']);
	angular.module('plateauAppApp', ['ngAnimate', 'ngAria', 'ngCookies',
		'ngMessages', 'ngResource', 'ngRoute', 'ngSanitize', 'ngTouch',
		'ui.router', 'ui.bootstrap', 'angularModalService' ,'plateauAppApp.controllers', 'plateauAppApp.directives'])
	.run(['$rootScope', '$state', function($rootScope, $state) { $rootScope.$state = $state; }])
	.config([ '$stateProvider', '$urlRouterProvider',
		function($stateProvider, $urlRouterProvider) {
			// For any unmatched url, send to /business
			$urlRouterProvider.otherwise('/');

			$stateProvider.state('accueilState', {
				url : '/',
				views:{
					'@':{
						templateUrl:'common/main.html',
						controller:'MainCtrl',
						controllerAs:'main'
					},
					'header@':{
						templateUrl:'common/header_index.html'

					},
					'footer@':
					{
						templateUrl:'common/footer_index.html'
					}
				}
			}).state('plateau', {
				url : '/plateau',
				abstract: true,
				views:{
					'@':{

						templateUrl:'presentation-plateau/accueil_plateau.html'

					},
					'footer@': {
						templateUrl : 'common/footer_index.html'
					},
					'header@':{
						templateUrl:'presentation-plateau/plateau_header.html',
						controller:'plateauHeaderCtrl'
					}
				}
			}).state('plateau.trombinoscope', {
				url : '/trombinoscope',
				views:{
					'@plateau':{
						templateUrl : 'presentation-plateau/trombinoscope/trombinoscope.html',
						controller:'trombiJsonCtrl',
						controllerAs:'trombinoscope'
						}
					}
			})
			.state('plateau.presentationPlateau', {
				url : '/presentation-plateau',
				views:{
					'@plateau':{
						templateUrl : 'presentation-plateau/presentationPlateau.html'
					}
			}
			})
			.state('plateau.communication_equipe', {
				url : '/communication-equipe',
				views:{
					'@plateau':{
						templateUrl : 'presentation-plateau/communication-equipe/communication_equipe.html'

					}
				}
			})
			.state('cnamts', {
				url : '/cnamts',
				abstract: true,
				views : {
					'@' : {
						templateUrl : 'cnamts/description-cnamts/cnamts_abstraite.html'
					},
					'header@' : {
						templateUrl : 'cnamts/header_cnam.html',
						controller: 'headerController'
					},
					'footer@': {
						templateUrl : 'common/footer_index.html'
					}
				}
			}).state('cnamts.accueil_cnamts', {
				url : '/accueil_cnamts',
				views:{
					'@cnamts':{
						templateUrl :'cnamts/description-cnamts/accueil_cnamts.html'
					}
				}

			}).state('cnamts.accueil_cnamts.organigrammeClient', {
				url : '/organigrammeClient',
				views:{
					'@cnamts':{
						templateUrl :'cnamts/organigramme/organigrammeClient.html'
					}
				}

			}).state('cnamts.standardCnamts', {
				url : '/standardCnamts',
				views:{
					'@cnamts':{
						templateUrl :'cnamts/standardCNAMTS/standardCnamts.html'
					}
				}

			}).state('cnamts.cadresOracle', {
				url : '/cadresOracle',
				views:{
					'@cnamts':{
						templateUrl : 'cnamts/ecosysteme-cnamts/cadresOracle.html',
						controller : ''
					}
				}
			}).state('cnamts.cadresToplink', {
				url : '/cadresToplink',
				views:{
					'@cnamts':{
						templateUrl : 'cnamts/ecosysteme-cnamts/cadresToplink.html',
						controller : ''
					}
				}
			}).state('cnamts.cadresWeblogic', {
				url : '/cadresWeblogic',
				views:{
					'@cnamts':{
						templateUrl : 'cnamts/ecosysteme-cnamts/cadresWeblogic.html',
						controller : ''
					}
				}
			}).state('cnamts.envEspacePro', {
				url : '/envEspacePro',
				views:{
					'@cnamts':{
						templateUrl : 'cnamts/ecosysteme-cnamts/envEspacePro.html',
						controller : ''
					}
				}
			}).state('cnamts.envMachineCnamts', {
				url : '/envMachineCnamts',
				views:{
					'@cnamts':{
						templateUrl : 'cnamts/ecosysteme-cnamts/envMachineCnamts.html',
						controller : ''
					}
				}
			}).state('cnamts.installation_KS_V5', {
				url : '/installation_KS_V5',
				views:{
					'@cnamts':{
						templateUrl : 'cnamts/ecosysteme-cnamts/installation_KS_V5.html',
						controller : ''
					}
				}
			}).state('cnamts.jms', {
				url : '/jms',
				views:{
					'@cnamts':{
						templateUrl : 'cnamts/ecosysteme-cnamts/jms.html',
						controller : ''
					}
				}
			}).state('cnamts.starterKits', {
				url : '/starterKits',
				views:{
					'@cnamts':{
						templateUrl : 'cnamts/ecosysteme-cnamts/starterKits.html',
						controller : ''
					}
				}
			}).state('cnamts.refabricationLogicielle', {
				url : '/refabricationLogicielle',
				views:{
					'@cnamts':{
						templateUrl : 'cnamts/ecosysteme-cnamts/refabricationLogicielle.html',
						controller : ''
					}
				}
			}).state('cnamts.organigrammeClient', {

				url : '/organigrammeClient',
				views:{
					'@cnamts':{
						templateUrl : 'cnamts/organigramme/organigrammeClient.html',
						controller : 'organigrammeClientCtrl',
						controllerAs: 'vm'
					}
				}
			}).state('cnamts.dirPoleOuest', {

				url : '/dirPoleOuest',
				views:{
					'@cnamts':{
						templateUrl : 'cnamts/organigramme/dirPoleOuest.html',
						controller : 'dirPoleOuestCtrl',
						controllerAs: 'vm'
					}
				}
			}).state('cnamts.dirPoleOuestEspPro', {

				url : '/dirPoleOuestEspPro',
				views:{
					'@cnamts':{
						templateUrl : 'cnamts/organigramme/dirPoleOuestEspPro.html',
						controller : 'dirPoleOuestEspProCtrl',
						controllerAs: 'vm'
					}
				}
			});

		} ]);
