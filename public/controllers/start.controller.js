(function () {
    'use strict';

    angular
        .module('game-of-drones')
        .controller('StartController', StartController);

    StartController.$inject = ['$location', 'PlayersService', 'ScoresService'];

    function StartController($location, PlayersService, ScoresService) {
        var vm = this;

        vm.scores;
        vm.start = start;

        getScores();

        function getScores() {
            ScoresService.getScores()
                .then(function (response) {
                    vm.scores = response.data;
                });
        }

        function start() {
            PlayersService.player1 = vm.player1;
            PlayersService.player2 = vm.player2;
            $location.path('/play');
        }
    }

})();