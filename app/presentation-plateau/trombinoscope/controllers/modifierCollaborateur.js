angular.module('plateauAppApp').controller('modifierCollaborateurInstanceCtrl', 
	function ($scope, collaborateur,collaborateurs) {
		$scope.collaborateurs = {
		nomCollab:[],
		prenomCollab:[]
	};
		$scope.nom = collaborateur.nom;
		$scope.prenom = collaborateur.prenom;
		$scope.poste = collaborateur.poste;
		$scope.bureau2 = collaborateur.bureau;
		//Initialisation des données
		$scope.bureaux = [];
		$scope.fonctionsAAfficher = [{
			codeFonction:[],
			libFonction:[]
		}];
		//Récupération des bureaux
		for(var i = 0; i < collaborateurs.data.length; i++){
			$scope.bureaux.push(collaborateurs.data[i].bureau);
			$scope.fonctionsAAfficher[0].libFonction.push(collaborateurs.data[i].fonction.libFonction);
			$scope.fonctionsAAfficher[0].codeFonction.push(collaborateurs.data[i].fonction.codeFonction);
			$scope.collaborateurs.nomCollab.push(collaborateurs.data[i].nom);
			$scope.collaborateurs.prenomCollab.push(collaborateurs.data[i].prenom);
		}
		
		//Récupère le codeFonction correspondant à la fonction selectionnée
		$scope.codeFonction = function(libelle){
			for(var i = 0; i<$scope.fonctionsAAfficher[0].codeFonction.length; i++){
				if(libelle === $scope.fonctionsAAfficher[0].libFonction[i]){
					return $scope.fonctionsAAfficher[0].codeFonction[i];
				}else{
					continue;
				}
			}
		}
		
		//Élimination des doublons dans le tableau contenant les bureaux
		$scope.bureaux = elimineDoublon($scope.bureaux);
		$scope.fonctionsAAfficher[0].libFonction = elimineDoublon($scope.fonctionsAAfficher[0].libFonction);
		$scope.fonctionsAAfficher[0].codeFonction = elimineDoublon($scope.fonctionsAAfficher[0].codeFonction);
		
		//Élimination des cases vides dans le tableau bureaux
		$scope.bureaux = $scope.bureaux.filter( function(val){
			if( val == '' || val == NaN || val == undefined || val == null ){
				return false;
			}
			return true;
		});
		
		//Fonction qui élimine les doublons
    function elimineDoublon(tableau) {
		var i, j, len = tableau.length, out = [], obj = {};
		for (i = 0; i < len; i++) {
			obj[tableau[i]] = "";
		}
		for (j in obj) {
			out.push(j);
		}
		return out;
	}
	$scope.enregistrer = function () {
		
		$scope.nouveauCollab = {
			nom : $scope.nom,
			prenom : $scope.prenom,
			poste : $scope.poste,
			bureau : $scope.bureau,
			localPhoto : $scope.localPhoto.name, 
			fonction : {
				codeFonction :$scope.codeFonction($scope.fonction),
				libFonction : $scope.fonction
			}
		};
		console.log()
		if($scope.form.$invalid){
			$scope.messageErreur = "(*) champs obligatoires!";
		}else{
			$uibModal.open({
				animation: $scope.animationsEnabled,
				templateUrl: 'presentation-plateau/trombinoscope/confirmation.html',
				controller: 'confirmationCtrl',
				resolve: {
					nouveauCollab: function() {
						return $scope.nouveauCollab; 
					}
				}
			});
			$uibModalInstance.close();
		} 
	};
  });