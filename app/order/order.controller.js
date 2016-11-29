(function() {
    'use strict';

    angular
        .module('app.order')
        .controller('OrderController', OrderController);

    OrderController.$inject = ['GlobalService', '$q'];
    function OrderController(GlobalService, $q) {
        var vm = this;

        vm.pizza = {
            dough: {
                name: 'Pate',
                ingredients: [
                    'Pain',
                    'Pizza'
                ]
            },
            base: {
                name: 'Base',
                ingredients: [
                    {
                        name: 'Tomates',
                        price: 3,
                        selected: false
                    },
                    {
                        name: 'Crème',
                        price: 4,
                        selected: false
                    }
                ]
            },
            ingredients: [
                {
                    name: 'Anchois',
                    price: 1,
                    selected: false
                },
                {
                    name: 'Jambon',
                    price: 2,
                    selected: false
                },
                {
                    name: 'Miel',
                    price: 2,
                    selected: false
                },
                {
                    name: 'Magret',
                    price: 4,
                    selected: false
                }
            ]
        };
        vm.selectedIngredients = [];
        vm.totalPrice = 0;

        // methods
        vm.create = create;
        vm.ordered = ordered;
        vm.calculateTotal = calculateTotal;
        vm.uncheck = uncheck;

        activate();

        ////////////////

        function activate() {
        }

        function create() {
            vm.hideStarter = true;
        }

        function calculateTotal() {
            vm.totalPrice = 0;
            iterateOnIngredients(vm.pizza.base.ingredients);
            iterateOnIngredients(vm.pizza.ingredients);
        }

        function iterateOnIngredients(obj) {
            for (var i = 0; i < obj.length; i++) {
                if (obj[i].selected) {
                    vm.totalPrice += obj[i].price;
                }
            }
        }

        function ordered() {
            GlobalService.setLoad(true);
            return GlobalService.setOrder()
                .then(function(data) {
                    console.log('ordered ', data);
                    alert('Votre commande a bien été pris en compte !');
                    GlobalService.setLoad(false);
                })
                .catch(function() {
                    alert('Une erreur c\'est produite, votre commande n\'a pas été prise en compte');
                });
        }

        function uncheck(ing) {
            for (var i = 0; i < vm.pizza.base.ingredients.length; i++) {
                if (vm.pizza.base.ingredients[i].selected && ing.name !== vm.pizza.base.ingredients[i].name) {
                    vm.pizza.base.ingredients[i].selected = false;
                }
            }
            console.log(vm.pizza.base.ingredients);
            calculateTotal();
        }
    }
})();