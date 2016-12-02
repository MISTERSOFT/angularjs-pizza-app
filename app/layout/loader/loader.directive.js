(function() {
    'use strict';

    angular
        .module('app.layout')
        .directive('loader', loader);

    function loader() {
        // Usage:
        // Affiche le loader en forme de pizza

        var directive = {
            bindToController: true,
            controller: LoaderController,
            controllerAs: 'vm',
            templateUrl: 'app/layout/loader/loader.html',
            restrict: 'E',
            scope: {
                loading: '='
            },
        };
        return directive;
    }

    LoaderController.$inject = ['$scope', '$element'];
    /* @ngInject */
    function LoaderController ($scope, $element) {
        var vm = this;

        $scope.$watch('vm.loading', function(newValue, oldValue) {
            if (newValue === oldValue) {
                return;
            }
            if (newValue !== oldValue) {
                // La class 'active-loader' est défini par défaut
                $element.find('div').toggleClass('hide-loader');
                $element.find('div').toggleClass('active-loader');

                // Avec ClassList (js pur)
                // $element[0].childNodes[0].classList.toggle('hide-loader');
                // $element[0].childNodes[0].classList.toggle('active-loader');
            }
        });
    }
})();