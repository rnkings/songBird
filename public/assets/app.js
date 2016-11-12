"use strict";

var app = angular.module('songBird', []); 

var tuneSubmitController = function($scope, $http, $log){
	var onResultsReturned = function(response){
		$scope.data = response.data;
		$scope.songResults = response.data.results;
	}

	var onError = function(errors){
		$scope.error = errors;
	}

	$scope.searchArtist = function(artist){
	  $http.jsonp('http://itunes.apple.com/search', {
	  	params: {
	  		'callback': 'JSON_CALLBACK',
	  		'term': artist
	  	}
	  }).then(onResultsReturned, onError)
	}
};

app.controller('tuneSubmitController', ['$scope', '$http', tuneSubmitController]);




