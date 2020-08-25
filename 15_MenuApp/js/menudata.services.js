(function() {
    'use strict';

    angular.module('Data',)
        .service('MenuDataService', MenuDataService )
        .constant('HerokuApp', "https://davids-restaurant.herokuapp.com/");

    //Inject http service to the MenuDataService
    MenuDataService.$inject = ['$http', 'HerokuApp'];    
    //Define the MenuData Service
    function MenuDataService($http, HerokuApp) {
        let service = this;

        service.getAllCategories = function() {
            console.log('Inside Categories Service');
            let categories = $http({
                method: 'GET',
                url: HerokuApp+'/categories.json'
            });
            return categories;
        }

        service.getItemsForCategory = function(categoryShortName) {
            console.log('Inside Item Services');
            let itemsForCategory = $http({
                method: 'GET',
                url: HerokuApp + 'menu_items.json?category=' + categoryShortName,
                params: {param1: categoryShortName}
            });
            return itemsForCategory;
        }
    }
})();