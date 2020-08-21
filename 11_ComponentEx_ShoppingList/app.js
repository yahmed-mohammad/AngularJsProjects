(function() {
    'use strict';

    let module = angular.module('ShoppingList', []);
    module.controller('ShoppingListController', ShoppingListController)
          .service('ShoppingListService', ShoppingListService)
          .component('myComponent', {
            templateUrl: 'shoppinList.html',
            controller: ComponentController, //as syntax is not used, then angular provides $ctrl for us
            bindings: { // similar to scope of directive
                items: '<', //one way binding
                myTitle: '@title', // DOM attribute value binding
                onRemove: '&' // callback to parent controller
            }
          });
    
    //Inject $scope for manipulating the DOM & $element for getting the html element
    ComponentController.$inject = ['$scope', '$element'];

    //Defining the Component Controller
    function ComponentController($scope, $element) {

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
        }
        this.remove = function(index) {
            this.onRemove({index: index});
        }

        //Component provided lifecycle methods

        this.$onInit= function() {
            console.log('This method executes once, when the controller initializes');
        }

        //ChangeObj is passed by angular for the watchers which is changed
        this.$onChanges = function(changeObj) {
            console.log("Changes",changeObj); // shows previous and current value
        }

        //Manipulate the DOM
        let $ctrl = this;
        this.$postLink = function() {
            $scope.$watch('$ctrl.cookiesInList()', function(newValue, oldValue) {
                console.log($element);
                if(newValue === true) {
                    let warningEle = $element.find('div.error');
                    warningEle.slideDown(1000);
                } else {
                    let warningEle = $element.find('div.error');
                    warningEle.slideUp(1000);
                }
            });
        }
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