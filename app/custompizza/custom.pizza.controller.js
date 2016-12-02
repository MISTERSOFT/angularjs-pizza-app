(function() {
    'use strict';

    angular
        .module('app.custompizza')
        .controller('CustomPizzaController', CustomPizzaController);

    CustomPizzaController.$inject = [
        'GlobalService', '$q', 'CookieService',
        'LoggerService'
    ];
    function CustomPizzaController(GlobalService, $q, CookieService,
    LoggerService) {
        var vm = this;

        // members
        vm.pizza = GlobalService.getIngredients();
        vm.totalPrice = 0;

        // methods
        vm.addToBasket = addToBasket;
        vm.calculateTotal = calculateTotal;
        vm.uncheck = uncheck;
        vm.selectDough = selectDough;

        activate();

        ////////////////

        function activate() {
        }

        function calculateTotal() {
            vm.totalPrice = 0;
            iterateOnIngredients(vm.pizza.base.ingredients);
            iterateOnIngredients(vm.pizza.ingredients);
        }

        /**
         * Itère sur les ingrédients et additionne le prix de ces derniers
         */
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
            if (isDoughSelected()) {
                var cookie = CookieService.getCookie('ng-pizza_basket');

                var pizzaObjCookie = {
                    type: 'Personnalisé',
                    ingredients: {
                        anchois: vm.pizza.ingredients[0].selected,
                        base: (vm.pizza.base.ingredients[0].selected) ? vm.pizza.base.ingredients[0].name
                            : (vm.pizza.base.ingredients[1].selected) ? vm.pizza.base.ingredients[1].name
                            : 'Pas de base',
                        chevre: vm.pizza.ingredients[4].selected,
                        image: 'img/pizza.png',
                        jambon: vm.pizza.ingredients[1].selected,
                        magret: vm.pizza.ingredients[3].selected,
                        miel: vm.pizza.ingredients[2].selected,
                        pate: (vm.pizza.dough.ingredients[0].selected) ? vm.pizza.dough.ingredients[0].name
                            : (vm.pizza.dough.ingredients[1].selected) ? vm.pizza.dough.ingredients[1].name
                            : 'Pas de base !',
                        nom: 'Personnalisé',
                        prix: vm.totalPrice
                    }
                };

                // Si c'est la première fois que le cookie est crée
                if (cookie === null) {
                    var listPizzas = [pizzaObjCookie];
                    CookieService.setCookie('ng-pizza_basket', listPizzas);
                }
                else {
                    cookie.push(pizzaObjCookie);
                    CookieService.setCookie('ng-pizza_basket', cookie);
                }
                LoggerService.success('Votre pizza personnalisé a bien été ajouté au panier');
            }
            else {
                LoggerService.warning('Vous devez sélectionner une pate');
            }
        }

        /**
         * Vérifie si une pate a bien été sélectionné
         */
        function isDoughSelected() {
            return vm.pizza.dough.ingredients[0].selected ||
                vm.pizza.dough.ingredients[1].selected; 
        }

        /**
         * Selectionne la pate
         * 
         * Passe le bool 'selected' à True pour la pate sélectionné
         * et False pour les autres
         */
        function selectDough(ing) {
            var doughs = vm.pizza.dough.ingredients;
            for (var i = 0; i < doughs.length; i++) {
                if (doughs[i].name === ing.name) {
                    doughs[i].selected = true;
                }
                else {
                    doughs[i].selected = false;
                }
            }
            console.log(doughs);
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