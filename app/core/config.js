(function() {
    'use strict';

    angular
        .module('app.core')
        .constant('constants', {
            title: 'Pizza Mania',
            cookieBasketName: 'ng-pizza_basket',
            cookieTrackerName: 'ng-pizza_tracker',
        })
        .constant('jQuery', $);

})();