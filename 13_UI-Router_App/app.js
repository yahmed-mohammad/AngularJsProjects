(function() {
    'use strict';

    angular.module('RoutingApp', ['ui.router']);

    angular.module('RoutingApp').config(RoutingConfig);

    //Inject state & url router provider/services to RouterConfig function
    RoutingConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

    //Define the RoutingConfig method
    function RoutingConfig($stateProvider, $urlRouterProvider) {

        //Redirect to /tab1 if there are no states associated with the url
        $urlRouterProvider.otherwise('/tab1');

        //setup UI states
        $stateProvider.state('tab1', {
            url: '/tab1',
            /*template: '<div>This is Tab1 Content</div>'*/
            templateUrl: 'src/tab1.html'
        })
        .state('tab2', {
            url: '/tab2', // It works without the url as well, but the url will not get changed
            /*template: '<div>This is Tab2 Content</div>'*/
            templateUrl: 'src/tab2.html'
        });
    }
})();