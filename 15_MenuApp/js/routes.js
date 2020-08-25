(function() {
    'use strict';

    angular.module('Data')
        .config(RoutingConfig);

    //Inject state & url router provider/services to RouterConfig function
    RoutingConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

    //Define the RoutingConfig method
    function RoutingConfig($stateProvider, $urlRouterProvider) {

        //Redirect to /tab1 if there are no states associated with the url
        $urlRouterProvider.otherwise('/');

        //setup UI states
        $stateProvider.state('home', {
            url: '/',
            templateUrl: 'html/home.html'
        })
        .state('categories', {
            url: '/categories',
            templateUrl: 'html/categories.html',
            controller: 'MenuCategoriesController as categoriesCtrl',
            resolve: {
                categories: ['MenuDataService', function(MenuDataService) {
                    return MenuDataService.getAllCategories();
                }]
            }
        })
        .state('categories.items', {
            url: '/items/{categoriesId}',
            templateUrl: 'html/items.html',
            controller: 'MenuItemsController as itemsCtrl',
        });
    }
})();