(function(window, document, location, navigator, $, angular, undefined) {
    'use strict';
    
    angular.module('tv.model', [])
    
    .factory('tvService', function($http) {
        return {
            all: function() {
                return $http({
                    method: 'GET'
                  , url: '/tv/list'
                });
            }
          , one: function(id) {
                return $http({
                    method: 'GET'
                  , url: '/tv/'+ id
                });
            }
        }
    })
    
;}(window, document, location, navigator, jQuery, angular, undefined));