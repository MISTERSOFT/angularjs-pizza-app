(function() {
    'use strict';

    angular
        .module('app.pizza')
        .controller('PizzaController', PizzaController);

    PizzaController.$inject = ['GlobalService', '$q', 'CookieService'];

    /* @ngInject */
    function PizzaController(GlobalService, $q, CookieService) {
        var vm = this;

        // members
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
                console.log('activate done');
            });
        }

        /**
         * Permet d'ajouter la pizza dans le panier
         */
        function addToBasket(pizza) {
            var cookie = CookieService.getCookie('ng-pizza_basket');
            console.log(cookie);

            var pizzaObjCookie = {
                type: pizza.nom,
                ingredients: pizza
            }
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

        // /**
        //  * Calcul le prix d'une pizza
        //  */
        // function calculatePizzaPrice(pizza) {
        //     var price = 0;
        //     var base = vm.ingredients.base.ingredients;
        //     var ingr = vm.ingredients.ingredients;

        //     // Parcours les bases
        //     for (var i = 0; i < base.length; i++) {
        //         // Si la base retourné par le Service Web correspond à la base
        //         // que l'on a coté front, alors on additionne le prix de la base
        //         // avec le prix total
        //         if (base[i].name.toLowerCase() === pizza.base) {
        //             price += base[i].price;
        //         }
        //     }

        //     // Parcours les ingrédients
        //     for (var i = 0; i < ingr.length; i++) {
        //         // Vérifie si la pizza (WebService) procède la propriété correspondant à mon objet qui
        //         // défini les ingérents d'une pizza
        //         // ET
        //         // que l'ingredient est dans la pizza
        //         if (pizza.hasOwnProperty(ingr[i].name.toLowerCase()) && pizza[ingr[i].name.toLowerCase()]) {
        //             price += ingr[i].price;
        //         }
        //     }

        //     return price;
        // }

        // async methods

        function getAllPizzas() {
            return GlobalService.getAllPizzas()
                .then(function(data) {
                    console.log('pizzas : ', data);
                    angular.forEach(data, function(pizza, i) {
                        // if (!pizza.prix) {
                        //     // Défini une nouvelle propriété dans l'objet reçu par le WebService
                        //     Object.defineProperty(pizza, 'price', {value: 0, writable: true});
                        //     pizza.price = calculatePizzaPrice(pizza);
                        // }
                    });
                    vm.pizzas = data;
                    return vm.pizzas;
                });
        }
    }
})();