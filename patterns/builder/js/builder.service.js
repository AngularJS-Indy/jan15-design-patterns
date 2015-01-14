(function() {
    angular.module('builder')
        .service('BuilderService', BuilderService)

    BuilderService.$inject = ['$q', 'FormFactory'];

    function BuilderService($q, FormFactory) {
        var Factory = FormFactory;
        var config = [];

        this.saveConfig = function(arr, cb) {
            config = arr;
            return cb(config);
        }

        this.getForm = getTemplates;

        function getTemplates() {
            var templates = Factory.build(config).then(function(res) {
                res = res.map(function(file) {
                    return file['data'];
                })
                console.log(res);
                return res;
            });
            return $q.when(templates);
        }
    }

})();