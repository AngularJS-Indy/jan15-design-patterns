(function() {
    angular.module('builder')
        .directive('builderConfigForm', builderConfigForm)
        .directive('formBuilder', formBuilder)

    builderConfigForm.$inject = ['$rootScope', 'BuilderService'];
    formBuilder.$inject = ['$rootScope', '$compile', 'BuilderService'];

    function builderConfigForm($rootScope, BuilderService) {

        function link(vm, elem, attrs) {
            var Service = BuilderService;
            vm.config = {};

            vm.saveConfig = function() {
                var config = makeArray(vm.config);
                BuilderService.saveConfig(config, broadcast);
            }

            function broadcast(res) {
                $rootScope.$broadcast('readyToBuild');
            };

            function makeArray(obj) {
                var arr = [];
                for (prop in obj) {
                    if (obj[prop]) arr.push(prop);
                }
                return arr;
            }

        }

        return {
            name: 'builderConfigForm',
            restrict: 'EA',
            scope: {},
            templateUrl: 'patterns/builder/views/builderConfigForm.html',
            link: link
        }
    }

    function formBuilder($rootScope, $compile, BuilderService) {

        function link(vm, elem, attrs) {
            var Service = BuilderService;
            elem = angular.element(elem);

            $rootScope.$on('readyToBuild', init);

            function init() {
                Service.getForm().then(compileForm);
            }

            function compileForm(templates) {
                elem.html(templates.join(''));
                $compile(elem.contents())(vm);
            }
        }

        return {
            name: 'formBuilder',
            restrict: 'EA',
            scope: {},
            link: link
        }
    }

})();