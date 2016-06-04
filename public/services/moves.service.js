(function () {
    'use strict';

    angular
        .module('game-of-drones')
        .service('MovesService', MovesService);

    MovesService.$inject = ['$http']

    function MovesService($http) {
        var service = {
            getMoves: getMoves
        };
        return service;

        function getMoves() {
            return $http.get('/moves');
        }
    }

})();