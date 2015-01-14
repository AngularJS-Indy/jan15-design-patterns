(function() {
    'use strict';

    angular.module('event-emitter')
        .directive('geoMap', geoMap)
        .directive('geoInput', geoInput)

    geoMap.$inject = ['$rootScope'];
    geoInput.$inject = ['$rootScope', 'EventEmitterService'];

    function geoMap($rootScope) {
        var map,
            latlng,
            mapOptions,
            marker;

        return {
            name: 'geoMap',
            scope: {},
            restrict: 'A',
            template: '<div></div>',
            replace: true,
            link: function(scope, elem, attrs) {
                function updateMap(evt, location) {
                    console.log(location);
                    latlng = new google.maps.LatLng(location.k, location.D);
                    console.log(latlng);
                    mapOptions = {
                        zoom: 15,
                        center: latlng
                    };
                    map = new google.maps.Map(elem[0], mapOptions);
                    map.setCenter(location);
                    marker = new google.maps.Marker({
                        map: map,
                        position: location
                    })

                }

                scope.$on('updateMap', updateMap);
            }
        };
    }

    function geoInput($rootScope, EventEmitterService) {
        return {
            name: 'geoInput',
            scope: {},
            templateUrl: 'patterns/event-emitter/views/geoInput.html',
            replace: true,
            restrict: 'A',
            link: function(scope, elem, attrs) {

                scope.getLocal = function(address) {
                    var Service = EventEmitterService;

                    address = stringify(address);

                    Service.geocode(address, updateMap);

                    function updateMap(results, status) {
                        console.log(results, status);
                        if (status === google.maps.GeocoderStatus.OK) {
                            var geometry = results[0].geometry;
                            $rootScope.$broadcast('updateMap', geometry.location);
                        } else {
                            console.log(status);
                            // scope.$apply(scope.location = status)
                        }

                    }
                }

                function stringify(obj) {
                    var address = obj.street + ', ' + obj.city + ', ' + obj.state + '  ' + obj.zip;
                    return address
                };

            }
        };
    }

})();