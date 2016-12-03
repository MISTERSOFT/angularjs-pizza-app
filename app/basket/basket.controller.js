(function() {
    'use strict';

    angular
        .module('app.basket')
        .controller('BasketController', BasketController);

    BasketController.$inject = ['CookieService', 'LoggerService', 'GlobalService',
    'constants', '$filter'];

    /* @ngInject */
    function BasketController(CookieService, LoggerService, GlobalService,
    constants, $filter) {
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

                        // Tracker
                        var cookieTracker = CookieService.getCookie(constants.cookieTrackerName);
                        console.log('cookieTracker ', cookieTracker);
                        if (cookieTracker) {
                            for (var i in vm.userBasket) {
                                var found = false;
                                for (var j in cookieTracker) {
                                    if (angular.equals(vm.userBasket[i], cookieTracker[j])) {
                                        console.log('equals');
                                        found = true;
                                    }
                                }
                                if (!found) {
                                    cookieTracker.push(vm.userBasket[i]);
                                }
                            }
                            CookieService.setCookie(constants.cookieTrackerName, cookieTracker);
                        }
                        else {
                            // Si il n'y a pas de cookie tracker
                            CookieService.setCookie(constants.cookieTrackerName, vm.userBasket);
                        }

                        // reset
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

        /**
         * Vérifie si la pizza n'est pas contenu dans le cookie tracker
         */
        function isContainInCookie(arrCookie, pizza) {
            var _arr = $filter('filter')(arrCookie, function(pizzaCookie) {
                if (JSON.stringify(pizzaCookie) === JSON.stringify(pizza)) {
                    console.log('pizza ', pizza);
                    console.log('pizzaCookie ', pizzaCookie);
                    return pizzaCookie;
                }
            });
            
            return _arr.length === 0 ? false : true;
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