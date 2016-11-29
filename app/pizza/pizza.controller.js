(function() {
    'use strict';

    angular
        .module('app.pizza')
        .controller('PizzaController', PizzaController);

    PizzaController.$inject = ['GlobalService', '$q'];

    /* @ngInject */
    function PizzaController(GlobalService, $q) {
        var vm = this;

        // members
        vm.pizzas = [];

        // methods
        vm.ordered = ordered;

        activate();

        ////////////////

        function activate() {
        	var promises = [
                getProduct()
            ];
            return $q.all(promises).then(function() {
                console.log('activate done');
            });
        }

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

        // async methods

        function getProduct() {
            return GlobalService.getProduct()
                .then(function(data) {
                    console.log('home have response from promise ', data);
                    vm.pizzas = data;
                    return vm.pizzas;
                });
        }
    }
})();