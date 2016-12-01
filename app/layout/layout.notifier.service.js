(function() {
'use strict';

    angular
        .module('app.layout')
        .factory('LayoutNotifier', LayoutNotifier);

    LayoutNotifier.$inject = [];
    function LayoutNotifier() {
        var vm = this;
        
        vm.navigation = false;
        
        return {
            // members
            navigation: false,
            // methods
            navigationChanged: navigationChanged
        };

        ////////////////

        function navigationChanged(value) {
            vm.navigation = value;
        }
    }
})();