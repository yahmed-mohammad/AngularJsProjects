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
        narrowCtrl.remove = function(index) {
            MenuSearchService.removeItem(index);
        }
    }

    //Inject http service in our service function
    MenuSearchService.$inject = ['$http'];

    //Defining Service
    function MenuSearchService($http) {
        let narrowService = this;
        let found = [];

        narrowService.getMatchedMenuItems = function(stringVal) {
            found = [];
            let responsePromise = $http({
                method: "GET",
                url: "https://davids-restaurant.herokuapp.com/menu_items.json"
            });
            
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
        narrowService.removeItem = function(index) {
            found.splice(index, 1);
        }
    }
})();