(function () {
    'use strict';
    let module = angular.module('UpperCaseAppDI', []);

    /*
    module.controller('UpperCaseControllerDI', ToUpperCaseController);
    * This is not recommended as in minification the $scope and $filter services will be removed
    * So, below are the two methods used to explicitly inject these dependencies usin AngularJS
    */

    /*
    module.controller('UpperCaseControllerDI', ['$scope', '$filter', ToUpperCaseController]);
    *One way of injecting the dependencies is through array
    */

   //Another way of injecting is through $inject service
   module.controller('UpperCaseControllerDI', ToUpperCaseController);

   //Controller function
   ToUpperCaseController.$inject('$scope', '$filter');

    function ToUpperCaseController($scope, $filter) {
        $scope.textField = 'Ahmed';
        $scope.upper = function() {
            var up = $filter('uppercase');
            $scope.textField = up($scope.textField);
        }
    }
})(); // ITFE