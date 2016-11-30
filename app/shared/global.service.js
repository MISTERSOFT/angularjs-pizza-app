(function() {
    'use strict';

    angular
        .module('app.shared')
        .service('GlobalService', GlobalService);

    GlobalService.$inject = ['$http'];
    function GlobalService($http) {

        var vm = this;

        vm.loading = false;
        vm.ingredients = {
            dough: {
                name: 'Pate',
                ingredients: [
                    {
                        name: 'Epaisse',
                        selected: false
                    },
                    {
                        name: 'Fine',
                        selected: false
                    }
                ]
            },
            base: {
                name: 'Base',
                ingredients: [
                    {
                        name: 'Tomate',
                        price: 3,
                        selected: false
                    },
                    {
                        name: 'Creme',
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
                },
                {
                    name: 'Chevre',
                    price: 3,
                    selected: false
                }
            ]
        };

        return {
        	getAllPizzas: getAllPizzas,
        	setOrder: setOrder,
            getIngredients: getIngredients,
            // Loader
            setLoad: setLoad,
            getLoad: getLoad
        };

        ////////////////

        function success(response) {
            return response.data;
        }

        function error(err) {
        	console.log('request failed ', err);
        }

        function getAllPizzas() {
        	return $http.get('http://localhost:8008/pizzas')
        		.then(success)
        		.catch(error);
        }

        function setOrder() {
        	return $http.get('http://localhost:8008/commanderPizza')
        		.then(success)
        		.catch(error);
        }

        function getIngredients() {
            return vm.ingredients;
        }

        // Loader
        // TODO  a supprimer ?
        function setLoad(value) {
            vm.loading = value;
        }
        function getLoad() {
            return vm.loading;
        }
    }
})();