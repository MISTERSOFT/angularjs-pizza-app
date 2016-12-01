(function() {
    'use strict';

    angular
        .module('app.layout')
        .directive('loader', loader);

    function loader() {
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
                $element[0].childNodes[0].classList.toggle('active-loader');
                $element[0].childNodes[0].classList.toggle('hide-loader');
            }
        });
    }
})();