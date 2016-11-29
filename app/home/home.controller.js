(function() {
	'use strict';

	angular
		.module('app.home')
		.controller('HomeController', HomeController);

	HomeController.$inject = [];
	function HomeController() {
		var vm = this;

		// members
		vm.title = 'Pizza Mania';

		/////

		activate();

		function activate() {
		}
	}
})();