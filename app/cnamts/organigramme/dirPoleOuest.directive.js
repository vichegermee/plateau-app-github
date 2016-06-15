/**
* @ngdoc directive
* @name plateauAppApp.controller:trombinoscopeCtrl
* @description Directive permettant d'afficher notre organigramme de la dpo
*/
/* (function() {
	angular.module('plateauAppApp.directives').directive('orgDpo', displayOrgDpo);
	function displayOrgDpo() {
		return {
			restrict : "EA",
			template : "<div class=\"chart\" id=\"collapsable-chart\"></div>",
			link : function() {
				var config = {
					container : "#collapsable-chart",
					animateOnInit : true,
					animateOnInitDelay:100,
					levelSeparation : 90,
					connectors : {
						type : 'curve'
					},
					node : {
						collapsable:true,
						drawLineThrough : false

					},
					animation : {
						nodeAnimation : "linear",
						nodeSpeed : 700,
						connectorsSpeed : 700
					}
				};
				// Définition de chaque noued avec ses différentes propriétés
				var pierre_tinet = {
					HTMLclass: 'blue',
					text : {
						name : "Pierre Tinet",
						title : "Direction pole ouest"
					}
				};
				//definition d'un noued et de ses proprietes
			 	var eric_roussille = {
					parent : pierre_tinet,
					HTMLclass: 'blue',
					text : {
						name : "Eric Roussille",
						title : "Direction pole ouest-Fabrication"
					}
				};
				//definition d'un noued et de ses proprietes
				var alain_marchand = {
					parent : eric_roussille,
					HTMLclass: 'blue',
					text : {
						name : "Alain Le Marchand",
						title : "Domaine Bénéficiares"
					}
				};
				//definition d'un noued et de ses proprietes
				var gerard_Pepion = {
					parent : eric_roussille,
					HTMLclass: 'blue',
					childrenDropLevel : 1,
					text : {
						name : "Gérard Pepion",
						title : "Programme 1"
					}

				};
				//definition d'un noued et de ses proprietes
			 	var olivier_robien = {
					parent : eric_roussille,
					HTMLclass: 'blue',
					text : {
						name : "Olivier De Robien",
						title : "Programme 2-Espace Pro"
					}

				};
				// Création d'un noued invisble pouvant contenir des noueds enfants
				var noeud1 = {
					parent : eric_roussille,
					pseudo : true
				};
			 	var noeud2 = {
					parent : eric_roussille,
					pseudo : true
				};
				//definition d'un noued et de ses proprietes
			 	var cecile_palard = {
					parent : noeud1,
					HTMLclass: 'blue',
					text : {
						name : "Cécile Palard-Fabien",
						title : "Domaine référentiels et produits médicaux"
					}

				};
				//definition d'un noued et de ses proprietes
			 	var tristan_besnier = {
					parent : noeud2,
					HTMLclass: 'blue',
					text : {
						name : "Tristan Besnier ",
						title : "produits à SLA"
					}
				};

				//construction de la structure de notre organigramme
				var chart_config = [ config, pierre_tinet, eric_roussille,
				alain_marchand, noeud1, gerard_Pepion, noeud2,
				olivier_robien, tristan_besnier, cecile_palard  ];

new Treant(chart_config);

			}
		};
	}

	})();
 */