(function() {
'use strict';

    angular
        .module('app.logger')
        .service('LoggerService', LoggerService);

    LoggerService.$inject = ['toaster', '$timeout'];
    function LoggerService(toaster, $timeout) {

        var vm = this;

        vm.timeout = 5000;
        
        return {
            success: success,
            error: error,
            info: info,
            warning: warning
        };

        ////////////////

        /**************************
         * CLIENT
         **************************/
        function success(message) {
            $timeout(function() {
                toaster.success({
                    title: 'Succès',
                    body: message,
                    timeout: vm.timeout,
                    showCloseButton: true
                });
            }, 0);
        }

        function error(message) {
            $timeout(function() {
                toaster.error({
                    title: 'Erreur',
                    body: message,
                    timeout: vm.timeout,
                    showCloseButton: true
                });
            }, 0);
        }

        function info(message) {
            $timeout(function() {
                toaster.info({
                    title: 'Information',
                    body: message,
                    timeout: vm.timeout,
                    showCloseButton: true
                });
            }, 0);
        }

        function warning(message) {
            $timeout(function() {
                toaster.warning({
                    title: 'Attention',
                    body: message,
                    timeout: vm.timeout,
                    showCloseButton: true
                });
            }, 0);
        }


        /**************************
         * SERVER
         **************************/
        function awareSuccessToServer(message) {
            // TODO : Do something
        }

        function awareErrorToServer(message) {
            // TODO : Do something
        }

        function awareInfoToServer(message) {
            // TODO : Do something
        }

        function awareWarningToServer(message) {
            // TODO : Do something
        }

    }
})();