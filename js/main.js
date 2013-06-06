require.config({
    paths: {
        'angular': '//cdnjs.cloudflare.com/ajax/libs/angular.js/1.1.5/angular.min',
        'underscore': '//cdnjs.cloudflare.com/ajax/libs/underscore.js/1.4.4/underscore-min',
        'q': '//cdnjs.cloudflare.com/ajax/libs/q.js/0.9.2/q.min',
    },
    shim: {
        'angular': {
            deps: [],
            exports: 'angular'
        },
        'underscore': {
            deps: [],
            exports: '_'
        },
        'q': {
            deps: [],
            exports: 'Q'
        },
    }
});

require(['angular', 'underscore'], function (angular, _) {
    'use strict';

    var app = angular.module('app', []);
    app.controller('map', ['$scope', function($scope) {
        $scope.primary = 'none';
        $scope.secondary1 = 'none';
        $scope.secondary2 = 'none';

        $scope.selection = function() {
            if(arguments.length >= 1) { // setter
                $scope.primary = (arguments[0][0] == null) ? 'none': arguments[0][0];
                $scope.secondary1 = (arguments[0][1] == null) ? 'none': arguments[0][1];
                $scope.secondary2 = (arguments[0][2] == null) ? 'none': arguments[0][2];
            } else { // getter
                return [
                    ($scope.primary == 'none') ? null : $scope.primary,
                    ($scope.secondary1 == 'none') ? null : $scope.secondary1,
                    ($scope.secondary2 == 'none') ? null : $scope.secondary2,
                ];
            }
        };

        $scope.mapClick = function(name) {
            console.log('yehaw');
            var selection = $scope.selection();
            var once = false;
            if(_.contains(selection, name)) {
                selection = _.map(selection, function(val) {
                    if(val == name && !once) {
                        once = true;
                        return null;
                    }
                    return val;
                });
            } else {
                selection = _.map(selection, function(val) {
                    if(val == null && !once) {
                        once = true;
                        return name;
                    }
                    return val;
                });
            }
            $scope.selection(selection);
        };




    }]);



    angular.bootstrap(document, ['app']);
});
