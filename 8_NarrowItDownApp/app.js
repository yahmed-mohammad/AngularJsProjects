(function() {
    'use strict';
    let module = angular.module('NarrowItDownApp',[]);

    module.controller('NarrowItDownController', NarrowItDownController);
    module.service('MenuSearchService', MenuSearchService);
    module.directive('menuList', MenuListDirective);

    function MenuListDirective() {
        var ddo = {
            templateUrl: "menu-list.html"
        }
        return ddo;
    }

    //Inject service into Controller
    NarrowItDownController.$inject = ['MenuSearchService'];
    //Defining Controller
    function NarrowItDownController(MenuSearchService) {
        let narrowCtrl = this;
        narrowCtrl.item = '';

        narrowCtrl.searchMenu = function() {
            narrowCtrl.found = MenuSearchService.getMatchedMenuItems(narrowCtrl.item);
        } 
    }

    //Inject http service in our service function
    MenuSearchService.$inject = ['$http'];

    //Defining Service
    function MenuSearchService($http) {
        let narrowService = this;

        narrowService.getMatchedMenuItems = function(stringVal) {
            let responsePromise = $http({
                method: "GET",
                url: "https://davids-restaurant.herokuapp.com/menu_items.json"
            });

            let found = [];
            
            responsePromise.then(function(response) {
                let menuItems = response.data.menu_items;
                for(let i=0; i<menuItems.length; i++) {
                    let description = menuItems[i].description;
                    if(description.indexOf(stringVal) !== -1) {
                        found.push(menuItems[i]);
                    }
                }
            }).catch(function(errorResponse) {
                console.log('Error');
            });
            return found;
        }
    }
})();