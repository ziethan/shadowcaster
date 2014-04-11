(function(window, document, location, navigator, $, angular, undefined) {
    'use strict';

    angular.module('settings', [
        'settings.controller'
      , 'settings.model'
    ])

    .config(function($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('home');
        
        $stateProvider.state('settings', {
            url: '/settings'
          , onEnter: function($timeout) {
                $timeout(function() {
                    $('[ui-view=navigation]').css({display:'block'});
                    $('[ui-view=footer]').css({display:'block'});
                    $('[ui-view=settings]').css({display:'block'});
                });
            }
          , onExit: function() {
                $('[ui-view=settings]').css({display:'none'});
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
              , 'settings': {
                    controller: 'settingsController'
                  , templateUrl: '/library/modules/settings/views/settings.html'
                }
            }
        });
    })

;}(window, document, location, navigator, jQuery, angular, undefined));