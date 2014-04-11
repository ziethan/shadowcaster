(function(window, document, location, navigator, $, angular, undefined) {
    'use strict';
    
    angular.module('app', [
        'ui.router'
      , 'ui.bootstrap'
      , 'ui.select2'
      , 'pascalprecht.translate'
      , 'angular-growl'
      , 'navigation'
      , 'footer'
      , 'home'
      , 'movies'
      , 'music'
      , 'pictures'
      , 'tv'
      , 'settings'
    ])
    
    .config(function($stateProvider, $urlRouterProvider, $logProvider, $translateProvider, growlProvider) {
        $urlRouterProvider.otherwise('home');
        
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
    
;}(window, document, location, navigator, jQuery, angular, undefined));