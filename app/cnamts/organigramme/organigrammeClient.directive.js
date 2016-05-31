/**
* @desc Directive permettant d'afficher notre organigramme
* @example
*/
(function() {
'use strict';

angular.module('plateauAppApp.directives')
  .directive('d3Lines',['d3','$http',displayOrganizationChart]);
function displayOrganizationChart(d3,$http){
	 return {
         restrict : 'EA',
         link : function(scope) {
           var data=[];
     		$http.get("../../data/collaborateur_cnamt.json")
     		     .then(function(response){
     		    	 data = response.data;
     			        console.log(data);
     		     });
     		 console.log(data);

      		}
         }
     };
})();
