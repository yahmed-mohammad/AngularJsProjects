(function(){
    'use strict';

    angular.module('Data')
        .controller('MenuItemsController', MenuItemsController);

        MenuItemsController.$inject = ['$stateParams', 'MenuDataService'];

        function MenuItemsController($stateParams, MenuDataService) {
            let itemsList = this;

            console.log('Inside Item Controller');
            let items = MenuDataService.getItemsForCategory($stateParams.categoriesId);
            
            items.then(function(resolve) {
                itemsList.categoryItems = resolve.data.menu_items;
                console.log(itemsList.categoryItems);
            }).catch(function(error) {
                console.log('Error Occurred!!!');
            });
        } 
})();