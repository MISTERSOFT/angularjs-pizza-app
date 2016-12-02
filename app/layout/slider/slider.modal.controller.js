(function() {
'use strict';

    angular
        .module('app.layout')
        .controller('SliderModalController', SliderModalController);

    SliderModalController.$inject = ['pizzaDetails', '$uibModalInstance', 'constants',
    'CookieService', 'LoggerService'];
    function SliderModalController(pizzaDetails, $uibModalInstance, constants,
    CookieService, LoggerService) {
        var vm = this;
        console.log(pizzaDetails);
        // members
        vm.pizza = pizzaDetails.ingredients;
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
            var type = (pizzaDetails.type === 'custom') ? 'personnalisé' : pizzaDetails.ingredients.nom;
            LoggerService.success('Votre pizza ' + type + ' a bien été ajouté au panier');
            $uibModalInstance.close();
        }

        function cancel() {
            $uibModalInstance.close();
        }
    }
})();