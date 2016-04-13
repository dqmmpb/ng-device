(function (angular) {
    "use strict";
    angular.module("ng-device", ["reTree"])
        .service('deviceUtils', ['device', function($window) {

            this.isMobile = function () {
                return device.ios;
            };

            this.isAndroid = function () {
                return device.android;
            };

            this.isIOS = function () {
                return device.ios;
            };

        }])
        .factory('device', ['$window',
            function ($window) {

                var device = {};
                var ua = navigator.userAgent;

                var android = ua.match(/(Android);?[\s\/]+([\d.]+)?/);
                var ipad = ua.match(/(iPad).*OS\s([\d_]+)/);
                var ipod = ua.match(/(iPod)(.*OS\s([\d_]+))?/);
                var iphone = !ipad && ua.match(/(iPhone\sOS)\s([\d_]+)/);

                device.ios = device.android = device.iphone = device.ipad = device.androidChrome = false;

                // Android
                if (android) {
                    device.os = 'android';
                    device.osVersion = android[2];
                    device.android = true;
                    device.androidChrome = ua.toLowerCase().indexOf('chrome') >= 0;
                }
                if (ipad || iphone || ipod) {
                    device.os = 'ios';
                    device.ios = true;
                }
                // iOS
                if (iphone && !ipod) {
                    device.osVersion = iphone[2].replace(/_/g, '.');
                    device.iphone = true;
                }
                if (ipad) {
                    device.osVersion = ipad[2].replace(/_/g, '.');
                    device.ipad = true;
                }
                if (ipod) {
                    device.osVersion = ipod[3] ? ipod[3].replace(/_/g, '.') : null;
                    device.iphone = true;
                }
                // iOS 8+ changed UA
                if (device.ios && device.osVersion && ua.indexOf('Version/') >= 0) {
                    if (device.osVersion.split('.')[0] === '10') {
                        device.osVersion = ua.toLowerCase().split('version/')[1].split(' ')[0];
                    }
                }

                // Webview
                device.webView = (iphone || ipad || ipod) && ua.match(/.*AppleWebKit(?!.*Safari)/i);

                // Minimal UI
                if (device.os && device.os === 'ios') {
                    var osVersionArr = device.osVersion.split('.');
                    device.minimalUi = !device.webView &&
                      (ipod || iphone) &&
                      (osVersionArr[0] * 1 === 7 ? osVersionArr[1] * 1 >= 1 : osVersionArr[0] * 1 > 7) &&
                      document.getElementsByName('viewport').length > 0 && document.getElementsByName('viewport')[0].attributes['content'].value.indexOf('minimal-ui')>= 0;
                }

                // Check for status bar and fullscreen app mode
                var windowWidth = window.outerWidth;
                var windowHeight = window.outerHeight;
                device.statusBar = false;
                if (device.webView && (windowWidth * windowHeight === screen.width * screen.height)) {
                    device.statusBar = true;
                }
                else {
                    device.statusBar = false;
                }

                // Pixel Ratio
                device.pixelRatio = window.devicePixelRatio || 1;

                // keng..
                device.isWeixin = /MicroMessenger/i.test(ua);

                return device;
            }
        ])
        .directive('device', ["device", function (device) {
            return {
                restrict: "A",
                link: function (scope, elm/*, attrs*/) {

                    // Classes
                    var classNames = [];

                    classNames.push('pixel-ratio-' + Math.floor(device.pixelRatio));
                    if (device.pixelRatio >= 2) {
                        classNames.push('retina');
                    }

                    // OS classes
                    if (device.os) {
                        classNames.push(device.os, device.os + '-' + device.osVersion.split('.')[0], device.os + '-' + device.osVersion.replace(/\./g, '-'));
                        if (device.os === 'ios') {
                            var major = parseInt(device.osVersion.split('.')[0], 10);
                            for (var i = major - 1; i >= 6; i--) {
                                classNames.push('ios-gt-' + i);
                            }
                        }

                    }

                    elm.addClass(classNames.length > 0 ? classNames.join(' ') : '');
                }
            };
        }]);
})(angular);
