(function() {
    'use strict';
    
    angular.module('Data')
        .controller('MenuCategoriesController', MenuCategoriesController);

    MenuCategoriesController.$inject = ['MenuDataService', 'categories'];

    function MenuCategoriesController(MenuDataService, categories) {
        this.categories = categories.data;
    }
})();