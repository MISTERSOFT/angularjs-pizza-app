(function() {
    'use strict';

    angular
        .module('app.basket')
        .controller('BasketController', BasketController);

    BasketController.$inject = ['CookieService', 'LoggerService', 'GlobalService',
    'constants'];

    /* @ngInject */
    function BasketController(CookieService, LoggerService, GlobalService,
    constants) {
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
                    if (data.status !== 500) {
                        LoggerService.success('Votre commande a bien été pris en compte !');
                        CookieService.removeCookie(constants.cookieBasketName);
                        vm.userBasket = [];
                        vm.totalPrice = 0;
                    }
                    else {
                        showError();
                    }
                })
                .catch(function() {
                    showError();
                });
        }

        function showError() {
            LoggerService.error('Une erreur c\'est produite, votre commande n\'a pas été prise en compte');
        }

        function deletePizza(pizza) {
            for (var i in vm.userBasket) {
                if (vm.userBasket[i].type === pizza.type) {
                    var msg = 'La pizza ' + pizza.type + ' a bien été supprimé';
                    vm.userBasket.splice(i, 1);
                    CookieService.setCookie(constants.cookieBasketName, vm.userBasket);
                    calculateTotalPrice();
                    LoggerService.info(msg);
                }
            }
        }

        function getBasket() {
            var cookie = CookieService.getCookie(constants.cookieBasketName);
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