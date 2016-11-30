(function() {
    'use strict';

    angular
        .module('app.basket')
        .controller('BasketController', BasketController);

    BasketController.$inject = ['CookieService'];

    /* @ngInject */
    function BasketController(CookieService) {
        var vm = this;

        // members
        vm.userBasket = [];

        // methods
        vm.ordered = ordered;
        vm.deletePizza = deletePizza;

        activate();

        ////////////////

        function activate() {
            getBasket();
        }

        /**
         * Permet de lancer la commande de la pizza
         */
        function ordered() {
            return GlobalService.setOrder()
                .then(function(data) {
                	console.log(data);
					alert('Votre commande a bien été pris en compte !');
                })
                .catch(function() {
                    alert('Une erreur c\'est produite, votre commande n\'a pas été prise en compte');
                });
        }

        function deletePizza(pizza) {
            for (var i in vm.userBasket) {
                if (vm.userBasket[i].type === pizza.type) {
                    vm.userBasket.splice(i, 1);
                    CookieService.setCookie('ng-pizza_basket', vm.userBasket);
                }
            }
        }

        function getBasket() {
            var cookie = CookieService.getCookie('ng-pizza_basket');
            console.log(cookie);
            if (cookie !== null) {
                vm.userBasket = cookie;
            }
        }
    }
})();