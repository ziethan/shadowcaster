(function(window, document, location, navigator, $, angular, undefined) {
    'use strict';

    angular.module('movies', [
        'movies.controller'
      , 'movies.model'
    ])

    .config(function($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('home');
        
        $stateProvider.state('movies', {
            url: '/movies'
          , onEnter: function($timeout) {
                $timeout(function() {
                    $('[ui-view=navigation]').css({display:'block'});
                    $('[ui-view=footer]').css({display:'block'});
                    $('[ui-view=movies]').css({display:'block'});
                });
            }
          , onExit: function() {
                $('[ui-view=movies]').css({display:'none'});
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
              , 'movies': {
                    controller: 'moviesController'
                  , templateUrl: '/library/modules/movies/views/movies.html'
                }
            }
        });
    })

;}(window, document, location, navigator, jQuery, angular, undefined));