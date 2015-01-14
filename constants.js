(function() {
    angular.module('Constants', [])
        .constant('API_ROUTES', {
            fuel: 'https://api.data.gov/nrel/alt-fuel-stations/v1/nearest.json?',
            buildings: 'http://api.data.gov/nrel/building-case-studies/project.json?'
        })
        .constant('API_KEY', '')
})();