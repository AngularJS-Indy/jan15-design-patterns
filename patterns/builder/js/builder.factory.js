(function() {
    angular.module('builder')
        .factory('FormFactory', FormFactory)

    FormFactory.$inject = ['$q', '$http'];

    function FormFactory($q, $http) {
        var baseUrl = 'patterns/builder/views/partials/';
        var templates = [];

        function build(config) {
            templates = config.map(getFile);

            return $q.all(templates);
        }

        function getFile(file) {
            return $http({
                method: 'GET',
                url: baseUrl + file + '.html'
            })
        }

        return {
            build: build
        }
    }

})();