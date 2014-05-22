(function(window, document, location, navigator, $, angular, undefined) {
    'use strict';

    angular.module('tv.controller', [])

    .controller('tvController', function($scope, $state, growl, tvService) {
        tvService.all().then(function(r) {
            $scope.tvshows = r.data.result.data;
        }, function(r) {
            growl.addErrorMessage(r.data.error);
        });
        
        $scope.getShow = function(id) {
            $state.go('tvplay', {showId: id});
        };
    })

;}(window, document, location, navigator, jQuery, angular, undefined));