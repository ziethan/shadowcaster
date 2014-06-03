(function(window, document, location, navigator, $, angular, undefined) {
    'use strict';
    
    angular.module('app', [
        'ui.router'
      , 'ui.bootstrap'
      , 'ui.select2'
      , 'pascalprecht.translate'
      , 'angular-growl'
      , 'shadowcaster.shadowplayer'
      , 'navigation'
      , 'footer'
      , 'home'
      , 'movies'
      , 'music'
      , 'pictures'
      , 'tv'
      , 'settings'
    ])
    
    .config(function($stateProvider, $sceProvider, $urlRouterProvider, $logProvider, $translateProvider, growlProvider) {
        $urlRouterProvider.otherwise('home');
        
        $sceProvider.enabled(false);
        
        $translateProvider.translations('en', {
            "LOGIN_USERNAME": "Username",
            "LOGIN_PASSWORD": "Password",
            "LOGIN_SIGNIN": "Sign In"
        });
        
        $translateProvider.translations('fr', {
            "LOGIN_USERNAME": "Nom d'utilisateur",
            "LOGIN_PASSWORD": "Mot de passe",
            "LOGIN_SIGNIN": "Ouverture de session"
        });
        
        $translateProvider.preferredLanguage('en');
        $logProvider.debugEnabled(false);
        growlProvider.globalTimeToLive(5000);
    })
    
    .run(function($rootScope, $timeout, growl) {
        $timeout(function() {
            if(!window.chrome || !window.chrome.cast || !window.chrome.cast.isAvailable) {
                growl.addWarnMessage('Cast is not available but you can still access your media in your browser.');
            } else {
                var sessionRequest = new window.chrome.cast.SessionRequest('6C26A4F8'),
                    apiConfig = new window.chrome.cast.ApiConfig(sessionRequest, function(session) {
                        $rootScope.session = session;
                    }, function(r) {
                        if(r === 'available') {
                            $rootScope.castAvailable = window.chrome.cast.isAvailable;
                            growl.addSuccessMessage('Chromecast is available. Happy casting!');
                        } else {
                            console.log(r);
                            growl.addWarnMessage('Cast is not available but you can still access your media in your browser.');
                        }
                    });
                window.chrome.cast.initialize(apiConfig);
            }
        });
    })
    
;}(window, document, location, navigator, jQuery, angular, undefined));