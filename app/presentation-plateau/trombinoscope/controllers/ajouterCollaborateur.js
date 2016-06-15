angular.module('plateauAppApp').controller('ajouterCollaborateurInstanceCtrl', function ($scope,$uibModalInstance, $http,FileReader,fonctionsAAfficher,collaborateurs) {
	$scope.bureaux = [];
	$scope.fonctionsAAfficher = fonctionsAAfficher;
	for(var i = 0; i < collaborateurs.data.length; i++){
		$scope.bureaux.push(collaborateurs.data[i].bureau);
	}
	$scope.bureaux = cleanArray($scope.bureaux);
	$scope.bureaux = $scope.bureaux.filter( function(val){
		if( val == '' || val == NaN || val == undefined || val == null ){
			return false;
		}
		return true;
	});
	console.log($scope.bureaux);
  $scope.ok = function () {
	  //console.log($scope.localPhoto);
	  $scope.messageErreur = '';
	  console.log();
	  var nouveauCollab = {
		  nom : $scope.nom,
		  prenom : $scope.prenom,
		  poste : $scope.poste,
		  bureau : $scope.bureau,
		  localPhoto : $scope.localPhoto.name,
		  fonction : {
			  codeFonction : '',
			  libFonction : $scope.libFonction
		  }
	  };
	  if(nouveauCollab.nom == undefined||nouveauCollab.prenom == undefined||nouveauCollab.poste == undefined||nouveauCollab.bureau == undefined||nouveauCollab.fonction.libFonction == undefined){
		  //console.log("entrez votre nom");
		  $scope.messageErreur = "Renseignez tous les champs qui ont * à droite";
	  }else{
		  var res = $http.post('http://localhost:3001/collaborateurs', nouveauCollab).success(function(data,status){
				$scope.message = data;
				//console.log($scope.message);
			})
	  
		  res.error(function(data, status, headers, config){
			  alert("failure message: "+ JSON.stringify({data : data}));
		  });
	  }
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
  
    function cleanArray(tableau) {
		var i, j, len = tableau.length, out = [], obj = {};
		for (i = 0; i < len; i++) {
			obj[tableau[i]] = 0;
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
});