(function(window, document, location, navigator, $, angular, undefined) {
    'use strict';

    angular.module('pictures', [
        'pictures.controller'
      , 'pictures.model'
    ])

    .config(function($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('home');
        
        $stateProvider.state('pictures', {
            url: '/pictures'
          , onEnter: function($timeout) {
                $timeout(function() {
                    $('[ui-view=navigation]').css({display:'block'});
                    $('[ui-view=footer]').css({display:'block'});
                    $('[ui-view=pictures]').css({display:'block'});
                });
            }
          , onExit: function() {
                $('[ui-view=pictures]').css({display:'none'});
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
              , 'pictures': {
                    controller: 'picturesController'
                  , templateUrl: '/library/modules/pictures/views/pictures.html'
                }
            }
        });
    })

;}(window, document, location, navigator, jQuery, angular, undefined));