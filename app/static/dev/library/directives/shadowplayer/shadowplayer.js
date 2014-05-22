(function(window, document, location, navigator, $, angular, undefined) {
    'use strict';
    
    angular.module('shadowcaster.shadowplayer', [])
    
    .directive('shadowplayer', function($rootScope) {
        return {
            restrict: 'E'
          , scope: {
                spSrc: '@'
            }
          , templateUrl: '/library/directives/shadowplayer/views/shadowplayer.html'
          , link: function(scope, elem, attrs) {
                var resize;
                
                scope.video = elem.find('#sp-video')[0];
                scope.controls = elem.find('#sp-controls');
                scope.playButton = elem.find('#sp-play');
                scope.muteButton = elem.find('#sp-mute');
                scope.castButton = elem.find('#sp-cast');
                scope.fullScreenButton = elem.find('#sp-fullscreen');
                scope.seekBar = elem.find('#sp-seek');
                scope.volumeBar = elem.find('#sp-volume');
                scope.src = attrs.spSrc;
                scope.seeking = false;
                scope.fullscreen = false;
                
                scope.castAvailable = $rootScope.castAvailable;

                scope.cast = function() {
                    function onMediaDiscovered(how, media) {scope.currentMedia = media;}
                    function onMediaError(error) {console.log(error);}
                    
                    if($rootScope.session) {
                        var mediaInfo = new window.chrome.cast.media.MediaInfo(attrs.spSrc, 'video/mp4'),
                            request = new window.chrome.cast.media.LoadRequest(mediaInfo);
                        
                        $rootScope.session.loadMedia(request, onMediaDiscovered.bind(this, 'loadMedia'), onMediaError);
                    } else {
                        var session = window.chrome.cast.requestSession(function(e) {
                                var mediaInfo = new window.chrome.cast.media.MediaInfo(attrs.spSrc, 'video/mp4'),
                                    request = new window.chrome.cast.media.LoadRequest(mediaInfo);
                                
                                $rootScope.session = e;
                                $rootScope.session.loadMedia(request, onMediaDiscovered.bind(this, 'loadMedia'), onMediaError);
                            });
                    }
                };
                
                $(scope.video).on('keypress', function(e) {
                    if(e.keyCode === 32) {
                        scope.play();
                    }
                });
                $(scope.video).on('click', function() {
                    scope.play();
                });
                
                scope.play = function() {
                    if(scope.video.paused) {
                        scope.video.play();
                        if(scope.currentMedia) {$scope.currentMedia.play();}
                    } else {
                        scope.video.pause();
                        if(scope.currentMedia) {$scope.currentMedia.pause();}
                    }
                };
                
                scope.mute = function() {
                    scope.video.muted = !scope.video.muted;
                };
                
                elem.find('#sp-fullscreen').on('click', function() {
                    if(!scope.isFullscreen) {
                        scope.fullscreen = true;
                        if(scope.video.requestFullscreen) {
                            scope.video.requestFullscreen();
                        } else if(scope.video.mozRequestFullScreen) {
                            scope.video.mozRequestFullScreen();
                        } else if(scope.video.webkitRequestFullscreen) {
                            scope.video.webkitRequestFullscreen();
                        }
                    } else {
                        scope.fullscreen = false;
                        if(scope.video.requestFullscreen) {
                            scope.video.cancelFullscreen();
                        } else if(scope.video.mozRequestFullScreen) {
                            scope.video.mozCancelFullScreen();
                        } else if(scope.video.webkitRequestFullscreen) {
                            scope.video.webkitCancelFullscreen();
                        }
                    }
                });
                
/*
                scope.seek = function() {
                    var time = scope.video.duration*(scope.seekBar.value/100);
                    scope.video.currentTime = time;
                });
                
                $(scope.video).on('timeupdate', function() {
                    var value = (100/scope.video.duration)*scope.video.currentTime;
                    scope.seekBar.value = value;
                });

                scope.seekBar.on('mousedown', function() {
                    scope.seeking = true;
                    scope.video.pause();
                });
*/
                
                resize = function() {
                    var w = scope.controls.innerWidth(),
                        pw = scope.playButton.outerWidth(true),
                        mw = scope.muteButton.outerWidth(true),
                        cw = scope.castButton.outerWidth(true),
                        fw = scope.fullScreenButton.outerWidth(true),
                        aw = w-(pw+mw+cw+fw);
                    
                    console.log(w, pw+mw+cw+fw+((aw*0.75)-10)+((aw*0.25)-10));
                    
                    scope.seekBar.width((aw*0.75)-10);
                    scope.volumeBar.width((aw*0.25)-10);
                };
                
                $(window).on('mouseup', function() {
                    if(scope.seeking) {
                        scope.video.play();
                    }
                }).on('resize', resize);
                
/*                 console.log($('#sp-controls').innerWidth(), $('#sp-play').outerWidth(), $('#sp-mute').outerWidth(), $('#sp-cast').outerWidth(), $('#sp-fullscreen').outerWidth(), $('#sp-seek').outerWidth(), $('#sp-volume').outerWidth()); */
                
                
/*
                scope.volumeBar.on('change', function() {
                    scope.video.volume = scope.volumeBar.value;
                });
*/
            }
        };
    })
    
;}(window, document, location, navigator, jQuery, angular, undefined));