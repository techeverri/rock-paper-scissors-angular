(function () {
    'use strict';

    angular
        .module('game-of-drones')
        .service('ScoresService', ScoresService);

    ScoresService.$inject = ['$http']

    function ScoresService($http) {
        var service = {
            getScores: getScores,
            setScores: setScores,
        };
        return service;

        function getScores() {
            return $http.get('/scores');
        }

        function setScores(player) {
            var data = {
                player: player
            };
            $http.post('/scores', data);
        }
    }

})();