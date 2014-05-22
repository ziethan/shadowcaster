(function(window, document, location, navigator, $, angular, undefined) {
    'use strict';

    angular.module('tv.play.controller', [])

    .controller('tvPlayController', function($scope, $state, $sce, growl, tvService) {
        var src = 'http://192.168.2.10/tv/'+$state.params.showId
        $sce.trustAsResourceUrl(src);
        $scope.src = src;
    })

;}(window, document, location, navigator, jQuery, angular, undefined));