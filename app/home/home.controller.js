(function() {
	'use strict';

	angular
		.module('app.home')
		.controller('HomeController', HomeController);

	HomeController.$inject = ['LayoutNotifier', '$timeout'];
	function HomeController(LayoutNotifier, $timeout) {
		var vm = this;

		// members
		vm.title = 'Pizza Mania';

		/////

		activate();

		function activate() {
			console.log(LayoutNotifier);
			$timeout(function() {
				LayoutNotifier.navigationChanged(Date.now());
			}, 0);
		}
	}
})();