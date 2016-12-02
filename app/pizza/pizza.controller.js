(function() {
    'use strict';

    angular
        .module('app.pizza')
        .controller('PizzaController', PizzaController);

    PizzaController.$inject = [
        'GlobalService', '$q', 'CookieService',
        'LoggerService', 'constants'
    ];

    /* @ngInject */
    function PizzaController(GlobalService, $q, CookieService, 
    LoggerService, constants) {
        var vm = this;

        // members
        vm.loading = true;
        vm.searchPizza = '';
        vm.orderPrice = '';
        vm.pizzas = [];
        vm.ingredients = GlobalService.getIngredients();

        // methods
        vm.addToBasket = addToBasket;

        activate();

        ////////////////

        function activate() {
        	var promises = [
                getAllPizzas()
            ];
            return $q.all(promises).then(function() {
                vm.loading = false;
            });
        }

        /**
         * Permet d'ajouter la pizza dans le panier
         */
        function addToBasket(pizza) {
            var cookie = CookieService.getCookie(constants.cookieBasketName);

            var pizzaObjCookie = {
                type: 'basic',
                ingredients: pizza
            }

            if (cookie === null) {
                var listPizzas = [
                    pizzaObjCookie
                ];
                CookieService.setCookie(constants.cookieBasketName, listPizzas);
            }
            else {
                cookie.push(pizzaObjCookie);
                CookieService.setCookie(constants.cookieBasketName, cookie);
            }
            LoggerService.success('Votre pizza a bien été ajouté dans votre panier');
        }

        // async methods

        function getAllPizzas() {
            return GlobalService.getAllPizzas()
                .then(function(data) {
                    if (data) {
                        vm.pizzas = data;
                        return vm.pizzas;
                    }
                    else {
                        LoggerService.error('Une erreur c\'est produite. Impossible de récupérer les pizzas disponible');
                        return false;
                    }
                });
        }
    }
})();