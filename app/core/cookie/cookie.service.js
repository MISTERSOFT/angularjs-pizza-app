(function() {
    'use strict';

    angular
        .module('app.cookie')
        .service('CookieService', CookieService);

    CookieService.$inject = [];

    /* @ngInject */
    function CookieService() {
        var vm = this;

        return {
        	setCookie: setCookie,
        	getCookie: getCookie,
        	removeCookie: removeCookie
        };

        /////

        function localStorageIsSupported() {
        	if (typeof localStorage !== 'undefined') {
        		return true;
        	}
        	return false;
        }

        function setCookie(key, valueObj) {
        	if (localStorageIsSupported()) {
        		localStorage.setItem(key, JSON.stringify(valueObj));
        	}
        	else {
        		throwErrorUnsupportedLocalStorage();
        	}
        }

        function getCookie(key) {
        	if (localStorageIsSupported()) {
        		return JSON.parse(localStorage.getItem(key));
        	}
        	else {
        		throwErrorUnsupportedLocalStorage();
        	}
        }

        function removeCookie(key) {
        	if (localStorageIsSupported()) {
        		localStorage.removeItem(key);
        	}
        	else {
        		throwErrorUnsupportedLocalStorage();
        	}
        }


        // Exceptions

        function throwErrorUnsupportedLocalStorage() {
        	throw new Error('Le navigateur ne support pas la fonctionnalité "localStorage"');
        }
    }
})();