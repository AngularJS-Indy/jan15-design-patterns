(function() {
    'use strict';

    angular.module('mvc')
        .controller('StandardMVCCtrl', StandardMVCCtrl)

    StandardMVCCtrl.$inject = ['MVCService'];

    function StandardMVCCtrl(MVCService) {
        var Service = MVCService;
        var vm = this;

        vm.getStations = function(p) {
            vm.stations = Service.getFuel(p).then(function(res) {
                vm.stations = res.fuel_stations;
            })
        }
    }


})();