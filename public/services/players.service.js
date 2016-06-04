(function () {
    'use strict';

    angular
        .module('game-of-drones')
        .service('PlayersService', PlayersService);

    function PlayersService() {
        var service = {
            player1: '',
            player2: ''
        };
        return service;
    }

})();