'use strict';
angular.module('myApp')
    .controller('ExamplesCtrl',
        function () {

        }
    )
    .controller('ExampleBasicCtrl',
        function ($scope, $sce) {
            $('pre code').each(function(i, block) {
                hljs.highlightBlock(block);
            });

            $scope.currentTime = 0;
            $scope.totalTime = 0;
            $scope.state = null;
            $scope.volume = 0;
            $scope.isCompleted = false;
            $scope.API = null;
            $scope.currentVideo = 0;

            $scope.onPlayerReady = function(API) {
                $scope.API = API;

                if ($scope.state == 'play' || $scope.isCompleted) $scope.API.play();

                $scope.isCompleted = false;
            };

            $scope.onCompleteVideo = function() {
                $scope.isCompleted = true;

                $scope.currentVideo++;

                if ($scope.currentVideo >= $scope.videos.length) $scope.currentVideo = 0;

                $scope.setVideo($scope.currentVideo);
            };

            $scope.onUpdateState = function(state) {
                $scope.state = state;
            };

			$scope.audio = [
				{src: $sce.trustAsResourceUrl("http://www.videogular.com/assets/audios/videogular.mp3"), type: "audio/mpeg"},
				{src: $sce.trustAsResourceUrl("http://www.videogular.com/assets/audios/videogular.ogg"), type: "audio/ogg"}
			];

            $scope.videos = [
                {
                    sources: [
                        {src: $sce.trustAsResourceUrl("http://www.videogular.com/assets/videos/videogular.mp4"), type: "video/mp4"},
                        {src: $sce.trustAsResourceUrl("http://www.videogular.com/assets/videos/videogular.webm"), type: "video/webm"},
                        {src: $sce.trustAsResourceUrl("http://www.videogular.com/assets/videos/videogular.ogg"), type: "video/ogg"}
                    ]
                },
                {
                    sources: [
                        {src: $sce.trustAsResourceUrl("http://www.videogular.com/assets/videos/big_buck_bunny_720p_h264.mov"), type: "video/mp4"},
                        {src: $sce.trustAsResourceUrl("http://www.videogular.com/assets/videos/big_buck_bunny_720p_stereo.ogg"), type: "video/ogg"}
                    ]
                }
            ];

            $scope.config = {
                autoHide: false,
                autoHideTime: 3000,
                autoPlay: false,
                sources: $scope.videos[0].sources,
                theme: {
                    url: "../styles/themes/default/videogular.css"
                },
                plugins: {
                    poster: "../assets/images/videogular.png"
                }
            };

            $scope.setVideo = function(index) {
                $scope.currentVideo = index;
                $scope.config.sources = $scope.videos[index].sources;
            };
        }
    )
    .directive("myLogobutton",
        [function() {
            return {
                restrict: "E",
                require: "^videogular",
                template: "<div class='iconButton'><a href='http://www.videogular.com'>LOGO</a></div>"
            }
        }
    ])
    .directive("myLogoPlugin",
        ["VG_STATES", function(VG_STATES) {
            return {
                restrict: "E",
                require: "^videogular",
                template: "<img src='../img/videogular.png' ng-show='showLogo'>",
                link: function(scope, elem, attrs, API) {
                    scope.showLogo = true;

                    scope.$watch(
                        function() {
                            return API.currentState;
                        },
                        function(newVal, oldVal) {
                            if (newVal != oldVal) {
                                scope.showLogo = (newVal != VG_STATES.PLAY);
                            }
                        }
                    )
                }
            }
        }
    ]);
