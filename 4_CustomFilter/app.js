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
        $scope.filterText = function() {
            let fil = textReplaceFilter($scope.textField);
            $scope.oneFilter = fil;
        }
        /*
        * Added a watchers in scope to check number of watchers initialized by Angular
        */
        $scope.watchers = 0;
        $scope.showNumberOfWatchers = function() {
        $scope.watchers = $scope.$$watchersCount;

        /*
        * Digest triggers everytime this is change in the watchers, plus one extra time to check if no more change is done
        * So, for a simgle change, digest cycle runs for 2 times
        */
    }
    }
})();