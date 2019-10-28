(function () {
    'use strict';

    angular
        .module('rock-paper-scissors')
        .service('PlayersService', PlayersService);

    function PlayersService() {
        var service = {
            player1: '',
            player2: ''
        };
        return service;
    }

})();
