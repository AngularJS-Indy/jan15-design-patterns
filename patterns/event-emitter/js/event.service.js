(function() {
    'use strict';

    angular.module('event-emitter')
        .service('EventEmitterService', GeolocationService)

    GeolocationService.$inject = ['$rootScope'];

    function GeolocationService($rootScope) {
        this.geocode = function(address, callback) {
            var geocoder = new google.maps.Geocoder();
            return geocoder.geocode({
                address: address
            }, callback);
        };
    }

})();