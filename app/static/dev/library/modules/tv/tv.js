(function(window, document, location, navigator, $, angular, undefined) {
    'use strict';
    
    angular.module('tv', [
        'tv.controller'
      , 'tv.play.controller'
      , 'tv.model'
    ])
    
    .config(function($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('home');
        
        $stateProvider.state('tv', {
            url: '/tv'
          , onEnter: function($timeout) {
                $timeout(function() {
                    $('[ui-view=navigation]').css({display:'block'});
                    $('[ui-view=footer]').css({display:'block'});
                    $('[ui-view=tv]').css({display:'block'});
                });
            }
          , onExit: function() {
                $('[ui-view=tv]').css({display:'none'});
            }
          , views: {
                'navigation': {
                    controller: 'navigationController'
                  , templateUrl: '/library/modules/navigation/views/navigation.html'
                }
              , 'footer': {
                    controller: 'footerController'
                  , templateUrl: '/library/modules/footer/views/footer.html'
                }
              , 'tv': {
                    controller: 'tvController'
                  , templateUrl: '/library/modules/tv/views/tv.html'
                }
            }
        }).state('tvplay', {
            url: '/tvPlay/:showId'
          , onEnter: function($timeout) {
                $timeout(function() {
                    $('[ui-view=navigation]').css({display:'block'});
                    $('[ui-view=footer]').css({display:'block'});
                    $('[ui-view=player]').css({display:'block'});
                    $('[ui-view=tv]').css({display:'none'});
                });
            }
          , onExit: function() {
                $('[ui-view=player]').css({display:'block'});
            }
          , views: {
                'navigation': {
                    controller: 'navigationController'
                  , templateUrl: '/library/modules/navigation/views/navigation.html'
                }
              , 'footer': {
                    controller: 'footerController'
                  , templateUrl: '/library/modules/footer/views/footer.html'
                }
              , 'player': {
                    controller: 'tvPlayController'
                  , templateUrl: '/library/modules/tv/views/play.html'
                }
            }
        });
    })
    
;}(window, document, location, navigator, jQuery, angular, undefined));