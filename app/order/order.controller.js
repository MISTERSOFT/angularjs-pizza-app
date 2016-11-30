(function() {
    'use strict';

    angular
        .module('app.order')
        .controller('OrderController', OrderController);

    OrderController.$inject = ['GlobalService', '$q', 'CookieService'];
    function OrderController(GlobalService, $q, CookieService) {
        var vm = this;

        vm.pizza = GlobalService.getIngredients();
        vm.totalPrice = 0;

        // methods
        vm.create = create;
        vm.addToBasket = addToBasket;
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

        /**
         * Permet d'ajouter la pizza dans le panier
         */
        function addToBasket() {
            var cookie = CookieService.getCookie('ng-pizza_basket');
            console.log(cookie);

            var pizzaObjCookie = {
                type: 'Personnalisé',
                ingredients: {
                    anchois: vm.pizza.ingredients.anchois,
                    base: (vm.pizza.base.ingredients[0].selected) ? vm.pizza.base.ingredients[0].selected : (vm.pizza.base.ingredients[1].selected) ? vm.pizza.base.ingredients[1].selected : false,
                    chevre: vm.pizza.ingredients[4].selected,
                    image: '',
                    jambon: vm.pizza.ingredients[1].selected,
                    magret: vm.pizza.ingredients[3].selected,
                    miel: vm.pizza.ingredients[2].selected,
                    pate: (vm.pizza.dough.ingredients[0].selected) ? vm.pizza.dough.ingredients[0].selected : (vm.pizza.dough.ingredients[1].selected) ? vm.pizza.dough.ingredients[1].selected : false,
                    nom: 'Personnalisé',
                    prix: calculateTotal()
                }
            };
            if (cookie === null) {
                var listPizzas = [
                    pizzaObjCookie
                ];
                CookieService.setCookie('ng-pizza_basket', listPizzas);
            }
            else {
                cookie.push(pizzaObjCookie);
                CookieService.setCookie('ng-pizza_basket', cookie);
            }
        }

        // function ordered() {
        //     // GlobalService.setLoad(true);
        //     return GlobalService.setOrder()
        //         .then(function(data) {
        //             console.log('ordered ', data);
        //             alert('Votre commande a bien été pris en compte !');
        //             GlobalService.setLoad(false);
        //         })
        //         .catch(function() {
        //             alert('Une erreur c\'est produite, votre commande n\'a pas été prise en compte');
        //         });
        // }

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