(function() {
    'use strict';

    angular
        .module('app.layout')
        .directive('navbar', navbar);

    function navbar() {
        var directive = {
            bindToController: true,
            controller: NavbarController,
            controllerAs: 'vm',
            restrict: 'E',
            templateUrl: 'app/layout/navbar/navbar.html',
            scope: {
            }
        };
        return directive;
    }
    
    NavbarController.$inject = ['$location', '$rootScope'];
    /* @ngInject */
    function NavbarController ($location, $rootScope) {
        var vm = this;

        // members
        vm.currentUrl = $location.url();

        // methods
        vm.isHome = isHome;
        vm.isCustomPizza = isCustomPizza;
        vm.isPizzas = isPizzas;
        vm.isBasket = isBasket;

        activate();

        function activate() {
            // Attend un changement de route
            $rootScope.$on('$locationChangeSuccess', function(e) {
                vm.currentUrl = $location.url();
            });
        }

        function isHome() {
            return vm.currentUrl === '/';
        }

        function isCustomPizza() {
            return vm.currentUrl === '/custom-pizza';
        }

        function isPizzas() {
            return vm.currentUrl === '/pizzas';
        }

        function isBasket() {
            return vm.currentUrl === '/basket';
        }
    }
})();