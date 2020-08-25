(function() {
    'use strict';

    angular.module('Data')
        .component('categoriesList', {
            templateUrl: 'html/template/categories.html',
            bindings: {
                categories: '<'
            }
        });
})();