angular.module('plateauAppApp').controller('uploadFile', function ($scope, fileUpload) {
   $scope.uploadFile = function(){
        var file = $scope.myFile;
        console.log('file is ' );
        console.dir(file);
        var uploadUrl = "http://localhost:3001/collaborateurs";
        fileUpload.uploadFileToUrl(file, uploadUrl);
    };
	console.log("TERMINÉ");
}).directive('fileModel', function ($parse) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            var model = $parse(attrs.fileModel);
            var modelSetter = model.assign;
            
            element.bind('change', function(){
                scope.$apply(function(){
                    modelSetter(scope, element[0].files[0]);
                });
            });
        }
    };
}).service('fileUpload', function ($http) {
    this.uploadFileToUrl = function(file, uploadUrl){
        var fd = new FormData();
        fd.append('file', file);
        $http.post(uploadUrl, fd, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined}
        })
        .success(function (fd, status, headers, config){
			var PostDataResponse = fd;
			console.log("succès du post "+PostDataResponse);
        })
        .error(function (fd, status, header, config) {
                var ResponseDetails = "Data: " + fd +
                    "<hr />status: " + status +
                    "<hr />headers: " + header +
                    "<hr />config: " + config;
			console.log("échec du post "+ResponseDetails);
        });
    }
});
