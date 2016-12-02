(function() {
    'use strict';

    angular
        .module('app.layout')
        .directive('slider', slider);

    function slider() {
        // Usage:
        // Permet de tracker l'utilisateur afin de lui permetre de choisir
        // plus rapide des choix de pizza dans un bandeau dédié en bas de page, exemple :
        // - L'utilisateur est déjà venu et à acheter tel pizza, on lui proposera la meme pizza
        // - L'utilisateur a personnalisé une pizza, on lui proposera de refaire exactement la meme

        var directive = {
            bindToController: true,
            controller: SliderController,
            controllerAs: 'vm',
            restrict: 'E',
            templateUrl: 'app/layout/slider/slider.html',
            scope: {
            }
        };
        return directive;
    }

    SliderController.$inject = ['$element', 'CookieService', 'constants',
    '$filter', 'jQuery', '$timeout', '$interval', '$uibModal'];
    /* @ngInject */
    function SliderController ($element, CookieService, constants,
    $filter, jQuery, $timeout, $interval, $uibModal) {
        var vm = this;

        // members
        vm.showSlider = false; // Permet de cacher le slider si aucun cookie n'est trouver
        vm.slides = null;
        vm.slideInterval = null; // Interval ID
        vm.intervalTime = 5000; // Interval entre chaque slides
        vm.currentSlide = 0;
        vm.play = true;
        vm.cookie = null;
        vm.title = ''; // Représente le title du tracker - Ex: Vous avez récemment commander
        vm.type = '';  // Représente le type de données à afficher - Ex: commande, pizza
        vm.data = [];  // Représente les données à afficher (commandes, pizza)

        // methods
        vm.moreDetails = moreDetails;

        activate();

        function activate() {
            getRandomData();
        }

        function getRandomData() {
            // use cookieTrackerName
            vm.cookie = CookieService.getCookie(constants.cookieBasketName);
            if (vm.cookie !== null) {
                /**
                 * Si choose = True alors on affiche les pizzas personnalisé récemment
                 * Sinon on affiche les commandes récemment passé
                 */
                var choose = Date.now() % 2 === 0 ? 'custom' : 'basic';
                vm.title = (choose === 'custom') ? 'Vous avez récemment composé ces pizzas' : 'Vous avez récemment commandé';
                // TODO : vérifie si le cookie contient se que 'choose' souhaite
                vm.data = $filter('filter')(vm.cookie, function(value) {
                    if (containsChoose(choose)) {
                        if (pizza.type === choose && containsChoose(choose)) {
                            // Pizzas personnalisé récemment
                            return value;
                        }
                    }
                    return value;
                });

                if (vm.data.length !== 0) {
                    vm.showSlider = true;

                    // Init slider
                    $timeout(function() {
                        vm.slides = $element.find('li');
                        vm.slideInterval = $interval(nextSlide, vm.intervalTime);
                    }, 0);
                }
            }
        }

        /**
         * Le cookie doit contenir au moins une pizza du type choisi (var: choose)
         */
        function containsChoose(choose) {
            for(var i in vm.cookie) {
                if (vm.cookie[i].type === choose) {
                    return true;
                }
            }
            return false;
        }

        function pauseSlider() {
            vm.play = false;
            $interval.cancel(vm.slideInterval);
        }

        function playSlider() {
            vm.play = true;
            vm.slideInterval = $interval(nextSlide, vm.intervalTime);
        }
        
        function nextSlide() {
            vm.slides[vm.currentSlide].className = 'text-center slide';
            vm.currentSlide = (vm.currentSlide + 1) % vm.slides.length;
            vm.slides[vm.currentSlide].className = 'text-center slide show-slide';
        }

        function moreDetails(pizza) {
            pauseSlider();
            var modalInstance = $uibModal.open({
                backdrop: true,
                bindToController: true,
                controllerAs: 'vm',
                controller: SliderModalController,
                templateUrl: 'app/layout/slider/slider.modal.html',
                size: 'md',
                ariaLabelledBy: pizza.nom,
                resolve: {
                    pizzaDetails: function() {
                        return pizza;
                    }
                }
            });

            modalInstance.then(function(value) {
                console.log(value);
            });
        }
    }
})();