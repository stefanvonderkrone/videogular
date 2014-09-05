'use strict';
angular.module('myApp').controller('MainCtrl',
	function ($scope, $sce) {
		$scope.currentTime = 0;
		$scope.totalTime = 0;
		$scope.state = null;
		$scope.volume = 1;
		$scope.isCompleted = false;
		$scope.API = null;

		$scope.onPlayerReady = function(API) {
			$scope.API = API;
		};

		$scope.config = {
			autoHide: false,
			autoHideTime: 3000,
			autoPlay: false,
			sources: [
				{src: $sce.trustAsResourceUrl("http://www.videogular.com/assets/videos/videogular.mp4"), type: "video/mp4"},
				{src: $sce.trustAsResourceUrl("http://www.videogular.com/assets/videos/videogular.webm"), type: "video/webm"},
				{src: $sce.trustAsResourceUrl("http://www.videogular.com/assets/videos/videogular.ogg"), type: "video/ogg"}
			],
			transclude: true,
			theme: {
				url: "styles/themes/default/videogular.css"
			},
			plugins: {
				poster: {
					url: "assets/images/videogular.png"
				}
			}
		};
	}
);
