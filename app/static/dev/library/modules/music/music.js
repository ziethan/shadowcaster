(function(window, document, location, navigator, $, angular, undefined) {
    'use strict';
    
    angular.module('music', [
        'music.controller'
      , 'music.model'
    ])

    .config(function($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('home');

        $stateProvider.state('music', {
            url: '/music'
          , onEnter: function($timeout) {
                $timeout(function() {
                    $('[ui-view=navigation]').css({display:'block'});
                    $('[ui-view=footer]').css({display:'block'});
                    $('[ui-view=music]').css({display:'block'});
                });
            }
          , onExit: function() {
                $('[ui-view=music]').css({display:'none'});
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
              , 'music': {
                    controller: 'musicController'
                  , templateUrl: '/library/modules/music/views/music.html'
                }
            }
        });
    })

;}(window, document, location, navigator, jQuery, angular, undefined));