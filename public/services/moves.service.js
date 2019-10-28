(function () {
    'use strict';

    angular
        .module('rock-paper-scissors')
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
