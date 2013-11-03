"use strict";
// Declare app level module which depends on filters, and services
var videogularApp = angular.module("videogularApp",
	[
		"controllers",

		"com.2fdevs.videogular",
		"com.2fdevs.videogular.plugins.controlbar",
		"com.2fdevs.videogular.plugins.overlayplay",
		"com.2fdevs.videogular.plugins.buffering",
		"com.2fdevs.videogular.plugins.poster"
	]
);

// Controllers
var controllerModule = angular.module('controllers', []);
controllerModule.controller("MainController", ["$scope", "$window", "VG_EVENTS", function (scope, $window, VG_EVENTS) {
	var widthInput = $("#widthInput");
	var heightInput = $("#heightInput");
	var videoDemo = $("#videoDemo");
	var elemWindow = angular.element($window);

	function calculateNewDimensions() {
		var percentWidth = scope.videogularElement[0].parentNode.clientWidth * 100 / scope.videoElement[0].videoWidth;
		var videoHeight = scope.videoElement[0].videoHeight * percentWidth / 100;

		scope.data.width = scope.videogularElement[0].parentNode.clientWidth;
		scope.data.height = videoHeight;
	}

	function onResizeWindow() {
		if (scope.data.responsive) {
			calculateNewDimensions();

			scope.$apply();
		}
	}

	scope.data = {
		"width": 960,
		"height": 480,
		"autoHide": false,
		"autoPlay": false,
		"responsive": true,
		"themes": [
			{label: "Default", url: "themes/default/videogular.css"},
			{label: "Solid", url: "themes/solid/solid.css"}
		],
		"stretchModes": [
			{label: "None", value: "none"},
			{label: "Fit", value: "fit"},
			{label: "Fill", value: "fill"}
		],
		"plugins": {
			"poster": {
				"url": "assets/images/oceans-clip.png"
			}
		}
	};

	scope.theme = scope.data.themes[0];
	scope.stretchMode = scope.data.stretchModes[1];

	scope.$on(VG_EVENTS.ON_PLAYER_READY, function() {
		onResizeWindow();
	});

	scope.onChangeResponsiveMode = function() {
		calculateNewDimensions();
	};

	elemWindow.on("resize", onResizeWindow);
}]);
