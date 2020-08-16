(function() {
    'use strict';

    let toBuy = [
        {
            name: "Milk",
            quantity: "4"
        },
        {
            name: "Tomato",
            quantity: "1"
        },
        {
            name: "Onion",
            quantity: "2"
        },
        {
            name: "Cadbury",
            quantity: "1"
        },
        {
            name: "Tea",
            quantity: "1"
        }
    ];

    let bought = [];

    //Define angular module, controllers and services
    let module = angular.module('ShoppingListCheckOff', []);
    module.controller('ShoppingListCheckerController', ShoppingListCheckerController);
    module.controller('ToBuyController', ToBuyController);
    module.controller('AlreadyBoughtController', AlreadyBoughtController);
    module.service('ShoppingService', ShoppingService);

    ShoppingListCheckerController.$inject = ['ShoppingService'];
    function ShoppingListCheckerController(ShoppingService) {
        let itemAdder = this;
        itemAdder.itemName = "";
        itemAdder.itemQuantity = "";

        itemAdder.addToBuyList = function() {
            ShoppingService.addItem(itemAdder.itemName, itemAdder.itemQuantity);
        }
    }

    ToBuyController.$inject = ['ShoppingService'];
    function ToBuyController(ShoppingService) {
        this.itemsList = ShoppingService.getItems();

        this.addToBoughtList = function(index) {
            ShoppingService.addBoughtList(index);
            ShoppingService.removeItem(index);
        }

        this.isEmpty = function() {
            if(this.itemsList.length == 0) {
                return true;
            }
        }
    }

    AlreadyBoughtController.$inject = ['ShoppingService'];
    function AlreadyBoughtController(ShoppingService) {
        this.itemsList = ShoppingService.getBoughtList();

        this.isEmpty = function() {
            if(this.itemsList.length == 0) {
                return true;
            }
        }
    }

    function ShoppingService() {
        let service = this;
        let items = toBuy;
        let boughtItems = bought;

        console.log(items);

        service.addItem = function(itemName, itemQuantity) {
            var item = {
                name: itemName,
                quantity: itemQuantity
            }
            items.push(item); 
        }
        service.getItems = function() {
            return items;
        }
        service.getBoughtList = function() {
            return boughtItems;
        }
        service.removeItem = function(index) {
            items.splice(index, 1);
        }
        service.addBoughtList = function(index) {
            var itemName = items[index].name;
            var itemQuantity = items[index].quantity;

            var item = {
                name: itemName,
                quantity: itemQuantity
            }
            boughtItems.push(item);
        }
    }
})();