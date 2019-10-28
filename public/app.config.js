(function () {
    'use strict';

    angular
        .module('rock-paper-scissors')
        .config(['$routeProvider', function ($routeProvider) {
            $routeProvider
                .when('/start', {
                    templateUrl: 'views/start.html',
                    controller: 'StartController',
                    controllerAs: 'vm'
                })
                .when('/play', {
                    templateUrl: 'views/play.html',
                    controller: 'PlayController',
                    controllerAs: 'vm'
                })
                .otherwise({
                    redirectTo: '/start'
                })
        }]);

    angular
        .module('rock-paper-scissors')
        .config(['$mdThemingProvider', function ($mdThemingProvider) {
            $mdThemingProvider.theme('default')
                .primaryPalette('blue');
        }]);

})();
