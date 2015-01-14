(function() {
    'use strict';

    angular.module('mvc')
        .service('MVCService', MVCService)


    MVCService.$inject = ['$http', '$q', 'API_ROUTES', 'API_KEY'];

    function MVCService($http, $q, API_ROUTES, API_KEY) {
        this.getFuel = function(params) {
            var args = {
                url: API_ROUTES.fuel,
                method: 'GET',
                params: {
                    api_key: API_KEY,
                    location: Params(params).location
                }
            }
            var promise = http(args).then(function(res) {
                return res
            })
            return $q.when(promise);
        }

        this.getBuildings = function(params) {
            var args = {
                url: API_ROUTES.buildings,
                method: 'GET',
                params: {
                    api_key: API_KEY,
                    output_format: 'json',
                    city: params.city,
                    province: params.state
                }
            }
            var promise = http(args).then(function(res) {
                return res
            })
            return $q.when(promise);
        }

        function http(args) {
            var defer = $q.defer();
            $http(args).success(function(res) {
                defer.resolve(res);
            }).error(function(err) {
                defer.reject(err);
            })
            return defer.promise;
        }

        function Params(obj) {
            var newObj = {};
            newObj['location'] = obj.city + '+' + obj.state;
            return newObj;
        }

    }
})()