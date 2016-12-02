(function() {
	'use strict';

	angular
		.module('app.home')
		.controller('HomeController', HomeController);

	HomeController.$inject = ['constants', 'CookieService'];
	function HomeController(constants, CookieService) {
		var vm = this;

		// members
		vm.title = constants.title;

		/////

		activate();

		function activate() {
		}
	}
})();