(function() {
	'use strict';

	angular
		.module('app.home')
		.controller('HomeController', HomeController);

	HomeController.$inject = ['constants'];
	function HomeController(constants) {
		var vm = this;

		// members
		vm.title = constants.title;

		/////

		activate();

		function activate() {
		}
	}
})();