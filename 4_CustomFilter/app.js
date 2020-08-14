(function() {
    'use strict';
    const module = angular.module('CustomFilterApp', []);

    module.controller('CustomFilterController', customFilterController);

    module.filter('textReplace', ReplaceFilterFactory);
    module.filter('argReplace', ArgReplaceFilterFacroty);

    customFilterController.$inject = ['$scope', 'textReplaceFilter'];

    function ReplaceFilterFactory() {
        return function(string) {
            return string.replace('Ahmed', 'Mohammad Ahmed');
        }
    }
    function ArgReplaceFilterFacroty() {
        return function(string, target, value) {
            return string.replace(target, value);
        }
    }

    function customFilterController($scope, textReplaceFilter) {
        $scope.textField = '';
        $scope.oneFilter= '';
        $scope.argFilter = '';
        $scope.filterText = function() {
            let fil = textReplaceFilter($scope.textField);
            $scope.oneFilter = fil;
        }
    }
})();