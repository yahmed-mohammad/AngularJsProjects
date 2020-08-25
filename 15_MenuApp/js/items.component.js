(function() {
    'use strict';

    angular.module('Data')
        .component('categoryItemList', {
            templateUrl: 'html/template/items.html',
            controller: 'MenuItemsController',
            bindings: {
                categoryItems: '<'
            }
        });
})();