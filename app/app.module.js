(function() {
    'use strict';

    angular
        .module('app', [
        	'ngRoute',
            'app.shared',
            'app.home',
            'app.order',
            'app.pizza'
        ])
        .config(configRoutes);

    configRoutes.$inject = ['$routeProvider'];

    function configRoutes($routeProvider) {
    	$routeProvider
    		.when('/', {
        		controller: 'HomeController',
        		controllerAs: 'vm',
        		templateUrl: 'app/home/home.html'
        	})
        	.when('/order', {
        		controller: 'OrderController',
        		controllerAs: 'vm',
        		templateUrl: 'app/order/order.html'
        	})
        	.when('/pizza', {
        		controller: 'PizzaController',
        		controllerAs: 'vm',
        		templateUrl: 'app/pizza/pizza.html'
        	})
    		.otherwise({
    			redirectTo: '/'
    		});
    }
})();