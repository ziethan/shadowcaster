(function(window, document, location, navigator, $, angular, undefined) {
    'use strict';
    
    angular.module('settings.model', [])
    
    .factory('settingsService', function($http) {
        return {
            getMoviePath: function(data) {
                return $http({method: 'GET', url: '/movies/path'});
            }
          , getTVPath: function() {
                return $http({method: 'GET', url: '/tv/path'});
            }
          , getMusicPath: function() {
                return $http({method: 'GET', url: '/music/path'});
            }
          , getPicturesPath: function() {
                return $http({method: 'GET', url: '/pictures/path'});
            }
          , setMoviePath: function(data) {
                return $http({method: 'POST', url: '/movies/path', data: data, headers: {'Content-Type': 'application/json'}});
            }
          , setTVPath: function(data) {
                return $http({method: 'POST', url: '/tv/path', data: data, headers: {'Content-Type': 'application/json'}});
            }
          , setMusicPath: function(data) {
                return $http({method: 'POST', url: '/music/path', data: data, headers: {'Content-Type': 'application/json'}});
            }
          , setPicturesPath: function(data) {
                return $http({method: 'POST', url: '/pictures/path', data: data, headers: {'Content-Type': 'application/json'}});
            }
        }
    })
    
;}(window, document, location, navigator, jQuery, angular, undefined));