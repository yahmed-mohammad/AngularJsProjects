(function() {
    'use strict';
    const module = angular.module('NameCalculatorApp', []);

    module.controller('NameCalculatorController', function($scope) {
        $scope.textField = '';
        $scope.textNumeric = 0;
        $scope.displayNumeric = function() {
            const totalTextNumeric = calculateTextNumeric($scope.textField);
            $scope.textNumeric = totalTextNumeric;
        }
    });
    function calculateTextNumeric(string) {
        let total = 0;
        for (let i = 0; i<string.length; i++) {
            total += string.charCodeAt(i);
        }
        return total;
    }
})();