(function(window, document, location, navigator, $, angular, undefined) {
    'use strict';

    angular.module('settings.controller', [])

    .controller('settingsController', function($scope, $state, growl, settingsService) {
        $scope.paths = {};
        settingsService.getMoviePath().then(function(r) {$scope.paths.movies = r.data.result.data.path;}, function(r) {growl.addWarnMessage(r.data.error);});
        settingsService.getTVPath().then(function(r) {$scope.paths.tv = r.data.result.data.path;}, function(r) {growl.addWarnMessage(r.data.error);});
/*         settingsService.getMusicPath().then(function(r) {$scope.paths.music = r.data.result.data.path;}, function(r) {growl.addWarnMessage(r.data.error);}); */
/*         settingsService.getPicturesPath().then(function(r) {$scope.paths.pictures = r.data.result.data.path;}, function(r) {growl.addWarnMessage(r.data.error);}); */
    
        $scope.saveMovies = function() {
            settingsService.setMoviePath({'filepath':$scope.paths.movies}).then(function(r) {
                growl.addSuccessMessage(r.data.result.message);
            }, function(r) {
                growl.addErrorMessage(r.data.error);
            });
        };
        
        $scope.saveTV = function() {
            settingsService.setTVPath({'filepath':$scope.paths.tv}).then(function(r) {
                growl.addSuccessMessage(r.data.result.message);
            }, function(r) {
                growl.addErrorMessage(r.data.error);
            });
        };
        
        $scope.saveMusic = function() {
            settingsService.setMusicPath({'filepath':$scope.paths.music}).then(function(r) {
                growl.addSuccessMessage(r.data.result.message);
            }, function(r) {
                growl.addErrorMessage(r.data.error);
            });
        };
        
        $scope.savePictures = function() {
            settingsService.setPicturesPath({'filepath':$scope.paths.pictures}).then(function(r) {
                growl.addSuccessMessage(r.data.result.message);
            }, function(r) {
                growl.addErrorMessage(r.data.error);
            });
        };
    })
    
;}(window, document, location, navigator, jQuery, angular, undefined));