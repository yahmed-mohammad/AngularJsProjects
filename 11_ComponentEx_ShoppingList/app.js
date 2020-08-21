(function() {
    'use strict';

    let module = angular.module('ShoppingList', []);
    module.controller('ShoppingListController', ShoppingListController)
          .service('ShoppingListService', ShoppingListService)
          .component('myComponent', {
            templateUrl: 'shoppinList.html',
            controller: ComponentController, //as syntax is not used, then angular provides $ctrl for us
            bindings: {
                items: '<', //one way binding
                myTitle: '@title', // DOM attribute value binding
                onRemove: '&' // callback to parent controller
            }
          });
    
    //Defining the Component Controller
    function ComponentController() {

        this.cookiesInList = function() {
            if(this.items !== undefined) {
                for(var i=0;i<this.items.length; i++) {
                    var name = this.items[i].name;
                    if(name !== undefined && name.toLowerCase().indexOf("cookie") !== -1) {
                        return true;
                    }
                }
            }
            return false;
        };
    }

    //Inject Service in Controller
    ShoppingListController.$inject = ['ShoppingListService'];
    //Defining the Shopping Controller
    function ShoppingListController(ShoppingListService) {
        var list = this;

        let myTitle = "# of items in list: ";
        
        list.addItem = function() {
            list.items = ShoppingListService.addItem(list.itemName, list.itemQuantity);
            list.title = myTitle + list.items.length;
        }

        list.removeItem = function(index) {
            list.lastRemoved = list.items[index].name;
            list.items = ShoppingListService.removeItem(index);
            list.title = myTitle + list.items.length;
        }
    }

    //Defining the Shopping Service
    function ShoppingListService() {
        let items = [];
        this.addItem = function(name, quantity) {
            let item = {
                name: name,
                quantity: quantity
            }
            items.push(item);
            return items;
        }

        this.removeItem = function(index) {
            items.splice(index, 1);
            return items;
        }
    }

})();