(function() {
    'use strict';

    angular.module('mvc', ['Constants'])
    angular.module('event-emitter', ['Constants'])
    angular.module('builder', ['Constants'])

    angular.module('app', ['ui.router', 'mvc', 'event-emitter', 'builder'])
        .config(config)

    function config($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('standard-mvc', {
                url: '/standard-mvc',
                templateUrl: 'patterns/mvc/views/standard.html',
                controller: 'StandardMVCCtrl as mvc'
            })
            .state('split-mvc', {
                url: '/split-mvc',
                templateUrl: 'patterns/mvc/views/split.html'
            })
            .state('event-emitter', {
                url: '/event-emitter',
                templateUrl: 'patterns/event-emitter/views/main.html'
            })
            .state('builder', {
                url: '/builder',
                templateUrl: 'patterns/builder/views/main.html'
            })

        $urlRouterProvider
            .otherwise('/');
    }

})();