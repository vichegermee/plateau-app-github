angular.module('plateauAppApp').controller('ajouterCollaborateurInstanceCtrl', 
	function ($scope, $rootScope, $uibModalInstance, $window, $http, FileReader, collaborateurs, $uibModal) {

	$scope.collaborateurs = {
		nomCollab:[],
		prenomCollab:[]
	};
	$scope.nom = '';
	$scope.prenom='';
	
	//Initialisation des données
	$scope.bureaux = [];
	$scope.fonctionsAAfficher = [{
		codeFonction:[],
		libFonction:[]
	}];
	$scope.messageErreur = '';
	$scope.nouveauCollab = {};
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
	
	//uppercase first letter of firstname
	var firstName = function(prenom){
		return (!!prenom) ? prenom.charAt(0).toUpperCase() + prenom.substr(1).toLowerCase() : '';
	}
	
	//Validation du formulaire d'ajouter d'un collaborateur
	$scope.enregistrer = function () {
		
		$scope.nouveauCollab = {
			nom : $rootScope.nom,
			prenom : firstName($scope.prenom),
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
  
	//Bouton cancel
	$scope.annuler = function () {
		$rootScope.nom = "";
		$scope.prenom = "";
		$scope.poste = "";
		//$uibModalInstance.dismiss('cancel');
	};
	
	//Bouton exit
	
	$scope.quitter = function(){
		
		$uibModalInstance.close();
		$window.location.reload();
	}
  
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

}).directive('fileChanged', function () {
    return {
        restrict: 'A',
        require: '?ngModel',
        link: function ($scope, element, attrs, ngModel) {
            if (!ngModel) {
                return;
            }

            ngModel.$render = angular.noop;
			
            element.bind('change', function (event) {
                ngModel.$setViewValue(event.target.files[0]);
                $scope.$apply();
            });
        }
    };
}).factory('FileReader', function ($q, $window) {

    if (!$window.FileReader) {
        throw new Error('Browser does not support FileReader');
    }

    function readAsDataUrl(file) {
        var deferred = $q.defer(),
            reader = new $window.FileReader();

        reader.onload = function () {
            deferred.resolve(reader.result);
        };

        reader.onerror = function () {
            deferred.reject(reader.error);
        };

        reader.readAsDataURL(file);
        return deferred.promise;
    }
    return {
        readAsDataUrl: readAsDataUrl
    };
}).directive('filePreview', function (FileReader) {
    return {
        restrict: 'A',
        scope: {
            filePreview: '='
        },
        link: function (scope, element, attrs) {
            scope.$watch('filePreview', function (filePreview) {
                if (filePreview && filePreview.name) {
                    FileReader.readAsDataUrl(filePreview).then(function (result) {
						scope.localPhoto = filePreview.name;
						element.attr('src', result);
                    });
                }
            });
        }
    };
}).directive('username', function($q, $timeout) {
  return {
    require: 'ngModel',
	scope: {
		collaborateurs: '=nouveauCollab',
        nom: '=nom'
	},
    link: function(scope, elm, attrs, ctrl) {
		ctrl.$asyncValidators.username = function(modelValue, viewValue) {
        if (ctrl.$isEmpty(modelValue)) {
          return $q.when();
        }
		
        var def = $q.defer();
		
        if(scope.collaborateurs.nomCollab.indexOf(scope.nom) === -1 && scope.collaborateurs.prenomCollab.indexOf(modelValue) === -1) {
			def.resolve();
        }else if(scope.collaborateurs.nomCollab.indexOf(scope.nom) === -1 || scope.collaborateurs.prenomCollab.indexOf(modelValue) === -1){
			def.resolve();
        }else{
            def.reject();
		}
        return def.promise;
      };
    }
  };
}).directive('uppercaseOnly',
  function() {
    return {
      restrict: 'A',
      require: 'ngModel',
      link: function(scope, element, attrs, ctrl) {
        element.on('keypress', function(e) {
          var char = e.char || String.fromCharCode(e.charCode);
          if (!/^[A-Z0-9]$/i.test(char)) {
            e.preventDefault();
            return false;
          }
        });

        function parser(value) {
          if (ctrl.$isEmpty(value)) {
            return value;
          }
          var formatedValue = value.toUpperCase();
          if (ctrl.$viewValue !== formatedValue) {
            ctrl.$setViewValue(formatedValue);
            ctrl.$render();
          }
          return formatedValue;
        }

        function formatter(value) {
          if (ctrl.$isEmpty(value)) {
            return value;
          }
          return value.toUpperCase();
        }

        ctrl.$formatters.push(formatter);
        ctrl.$parsers.push(parser);
      }
    };
  });