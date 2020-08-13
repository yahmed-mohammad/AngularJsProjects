(function() {
    'use strict';

    //Bind the angular application with HTML
    const module = angular.module('LunchCheck', []);

    //Bind controller with HTML element
    module.controller('LunchCheckController', lunchItemController);

    //inject the dependencies, also minification proof
    lunchItemController.$inject = ['$scope'];
    //create controller function
    function lunchItemController($scope) {
        $scope.items = '';
        $scope.feedback = '';
        $scope.checkItems = function() {
            let feedback = checkEnteredItems($scope.items);
            $scope.feedback = feedback;
        }
    }

    function checkEnteredItems(lunchItems) {
        let feedback = '';
        if(lunchItems.length == 0) {
            feedback = 'Please enter data first';
        } else {
            feedback = evaluateItems(lunchItems);
        }
        return feedback;
    }

    function evaluateItems(itemsString){
        let items = itemsString.split(',');
        let feedback = '';
        console.log(items.length);
        let countItems = 0;
        for(var i in items) {
            if(items[i].trim().length >0) {
                countItems++;
            }
        }
        if(countItems <=3) {
            feedback = 'Enjoy!';
        } else {
            feedback = 'Too much!';
        }
        return feedback;
    }
})();