(function () {
    'use strict';

    angular
        .module('rock-paper-scissors')
        .controller('PlayController', PlayController);

    PlayController.$inject = ['$location', 'PlayersService', 'MovesService', '$mdDialog', 'ScoresService'];

    function PlayController($location, PlayersService, MovesService, $mdDialog, ScoresService) {
        var vm = this;

        vm.moves;
        vm.player1;
        vm.player2;
        vm.scores = [];
        vm.round = 1;
        vm.player1wins = 0;
        vm.player2wins = 0;
        vm.player1move;
        vm.player2move;
        vm.player1Ok;
        vm.player2Ok;

        vm.roundResult = roundResult;

        getPlayers();
        getMoves();

        function getPlayers() {
            if (!PlayersService.player1 || !PlayersService.player2) {
                $location.path('/start');
            }
            vm.player1 = PlayersService.player1;
            vm.player2 = PlayersService.player2;
        }

        function getMoves() {
            MovesService.getMoves()
                .then(function (response) {
                    vm.moves = response.data;
                });
        }

        function roundResult() {
            var winner = roundWinner();
            vm.scores.push({ round: vm.round, winner: winner });
            if (vm.player1wins === 3) {
                weHaveAWinner(vm.player1);
            } else if (vm.player2wins === 3) {
                weHaveAWinner(vm.player2);
            } else {
                nextRound();
            }
        }

        function roundWinner() {
            var winner;
            if (vm.player1move.beats == vm.player2move.name) {
                vm.player1wins++;
                winner = vm.player1;
            } else if (vm.player2move.beats == vm.player1move.name) {
                vm.player2wins++;
                winner = vm.player2;
            } else {
                winner = "Nobody";
            }
            return winner;
        }

        function weHaveAWinner(winner) {
            ScoresService.setScores(winner);
            var congratulations = $mdDialog.alert()
                .clickOutsideToClose(false)
                .title('¡We have a WINNER!')
                .textContent(winner + ' is the new EMPEROR!')
                .ok('Play again');
            $mdDialog.show(congratulations).then(function () {
                $location.path('/start');
            });
        }

        function nextRound() {
            vm.round++;
            vm.player1Form.$setPristine();
            vm.player2Form.$setPristine();
            vm.player1move = undefined;
            vm.player2move = undefined;
            vm.player1Ok = false;
            vm.player2Ok = false;
        }

    }

})();
