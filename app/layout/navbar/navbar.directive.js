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
    
    NavbarController.$inject = ['$location', 'LayoutNotifier'];
    /* @ngInject */
    function NavbarController ($location, LayoutNotifier) {
        var vm = this;

        // members
        vm.currentUrl = $location.url();

        // methods
        vm.isHome = isHome;
        vm.isCustomPizza = isCustomPizza;
        vm.isPizzas = isPizzas;
        vm.isBasket = isBasket;

        function activate() {
            $scope.$watch('LayoutNotifier.navigation', function() {
                console.log('notified');
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