(function() {
    angular.module('mvc')
        .directive('fuelStations', fuelStations)
        .directive('buildingProjects', buildingProjects)

    fuelStations.$inject = ['MVCService'];
    buildingProjects.$inject = ['MVCService'];

    function fuelStations(MVCService) {

        function link(vm, elem, attrs) {
            var Service = MVCService;

            vm.getStations = function(p) {
                vm.stations = Service.getFuel(p).then(function(res) {
                    vm.stations = res.fuel_stations;
                })
            }
        }

        return {
            name: 'fuelStations',
            restrict: 'EA',
            scope: true,
            templateUrl: 'patterns/mvc/views/fuelStations.html',
            link: link
        }
    }

    function buildingProjects(MVCService) {

        function link(vm, elem, attrs) {
            var Service = MVCService;

            vm.getBuildings = function(p) {
                vm.buildings = Service.getBuildings(p).then(function(res) {
                    console.log(res)
                    vm.buildings = res;
                })
            }
        }

        return {
            name: 'buildingProjects',
            restrict: 'EA',
            scope: true,
            templateUrl: 'patterns/mvc/views/buildingProjects.html',
            link: link
        }
    }


})();