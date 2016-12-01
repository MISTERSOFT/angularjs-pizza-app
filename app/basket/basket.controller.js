(function() {
    'use strict';

    angular
        .module('app.basket')
        .controller('BasketController', BasketController);

    BasketController.$inject = ['CookieService', 'LoggerService'];

    /* @ngInject */
    function BasketController(CookieService, LoggerService) {
        var vm = this;

        // members
        vm.userBasket = [];
        vm.totalPrice = 0;

        // methods
        vm.ordered = ordered;
        vm.deletePizza = deletePizza;

        activate();

        ////////////////

        function activate() {
            getBasket();
            calculateTotalPrice();
        }

        /**
         * Permet de lancer la commande de la pizza
         */
        function ordered() {
            return GlobalService.setOrder()
                .then(function(data) {
                	console.log(data);
                    LoggerService.success('Votre commande a bien été pris en compte !');
                })
                .catch(function() {
                    LoggerService.error('Une erreur c\'est produite, votre commande n\'a pas été prise en compte');
                });
        }

        function deletePizza(pizza) {
            for (var i in vm.userBasket) {
                if (vm.userBasket[i].type === pizza.type) {
                    var msg = 'La pizza ' + pizza.type + ' a bien été supprimé';
                    vm.userBasket.splice(i, 1);
                    CookieService.setCookie('ng-pizza_basket', vm.userBasket);
                    calculateTotalPrice();
                    LoggerService.info(msg);
                }
            }
        }

        function getBasket() {
            var cookie = CookieService.getCookie('ng-pizza_basket');
            if (cookie !== null) {
                vm.userBasket = cookie;
            }
        }

        function calculateTotalPrice() {
            vm.totalPrice = 0;
            for (var i in vm.userBasket) {
                vm.totalPrice += vm.userBasket[i].ingredients.prix;
            }
        }
    }
})();