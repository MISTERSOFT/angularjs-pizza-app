(function() {
    'use strict';

    angular
        .module('app.shared', [])
        .service('GlobalService', GlobalService);

    GlobalService.$inject = ['$http'];
    function GlobalService($http) {

        var vm = this;

        vm.loading

        return {
        	getProduct: getProduct,
        	setOrder: setOrder,
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

        function getProduct() {
        	return $http.get('http://localhost:8008/pizzas')
        		.then(success)
        		.catch(error);
        }

        function setOrder() {
        	return $http.get('http://localhost:8008/commanderPizza')
        		.then(success)
        		.catch(error);
        }

        // Loader

        function setLoad(value) {
            vm.loading = value;
        }
        function getLoad() {
            return vm.loading;
        }
    }
})();