(function() {
    'use strict';
    let arrayShoppingList = ['Milk', 'Potatos'];
    let objectShoppingList = [
        {
            name: "Milk",
            quantity: "2"
        },
        {
            name: "Tomato",
            quantity: "3"
        }
    ];
    const module = angular.module('ShoppingListApp', []);
    module.controller('ShoppingListController', ShoppingListController);
    ShoppingListController.$inject = ['$scope'];

    function ShoppingListController($scope) {
        $scope.arrayShoppingList = arrayShoppingList;
        $scope.objectShoppingList = objectShoppingList;

        $scope.addToObject = function() {
            let newItem = {
                name: $scope.newItemObject,
                quantity: $scope.newItemQuantity
            }
            $scope.objectShoppingList.push(newItem);
        }

        $scope.addToArray = function() {
            $scope.arrayShoppingList.push($scope.newItemArray);
        }
    }
})();
