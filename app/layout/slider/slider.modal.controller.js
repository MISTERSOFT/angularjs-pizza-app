(function() {
'use strict';

    angular
        .module('app.layout')
        .controller('SliderModalController', SliderModalController);

    SliderModalController.$inject = ['pizzaDetails', 'modalInstance', 'constants',
    'CookieService', 'LoggerService'];
    function SliderModalController(pizzaDetails, modalInstance, constants,
    CookieService, LoggerService) {
        var vm = this;

        // members
        vm.pizza = pizzaDetails;
        vm.addToBasket = addToBasket;
        vm.cancel = cancel;
        
        activate();

        ////////////////

        function activate() {}

        function addToBasket() {
            var cookie = CookieService.getCookie(constants.cookieBasketName);
            if (cookie === null) {
                var listPizzas = [pizzaDetails];
                CookieService.setCookie(constants.cookieBasketName, listPizzas);
            }
            else {
                cookie.push(pizzaDetails);
                CookieService.setCookie(constants.cookieBasketName, cookie);
            }
            LoggerService.success('Votre pizza ' + (pizzaDetails.type === 'custom') ? 'personnalisé' : pizzaDetails.ingredients.nom + ' a bien été ajouté au panier');
            modalInstance.close();
        }

        function cancel() {
            modalInstance.close();
        }
    }
})();