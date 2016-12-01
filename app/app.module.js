(function() {
    'use strict';

    angular
        .module('app', [
        	'ngRoute',
			'app.layout',
            'app.core',
            'app.shared',
            'app.home',
            'app.custompizza',
            'app.pizza',
            'app.basket'
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
        	.when('/custom-pizza', {
        		controller: 'CustomPizzaController',
        		controllerAs: 'vm',
        		templateUrl: 'app/custompizza/custom.pizza.html'
        	})
        	.when('/pizzas', {
        		controller: 'PizzaController',
        		controllerAs: 'vm',
        		templateUrl: 'app/pizza/pizza.html'
        	})
            .when('/basket', {
                controller: 'BasketController',
                controllerAs: 'vm',
                templateUrl: 'app/basket/basket.html'
            })
    		.otherwise({
    			redirectTo: '/'
    		});
    }
})();