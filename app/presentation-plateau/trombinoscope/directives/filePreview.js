angular.module('plateauAppApp')
.directive('filePreview', function (FileReader) {
    return {
        restrict: 'A',
        scope: {
            filePreview: '='
        },
        link: function (scope, element, attrs) {
            scope.$watch('filePreview', function (filePreview) {
                if (filePreview && filePreview.name) {
                    FileReader.readAsDataUrl(filePreview).then(function (result) {
                        element.attr('src', result);
                    });
                }
            });
        }
    };
});