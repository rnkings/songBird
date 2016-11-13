"use strict";

var app = angular.module('songBird', []); 

//disables the security that won't allow the audio preview to play because it's from another site
app.config(function($sceProvider) {
	$sceProvider.enabled(false);
});

var tuneSubmitController = function($scope, $http){
	$scope.songResults = [];
	$scope.currentPage = 1;
	$scope.perPage = 5;

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

	/**
	 * Pagination Methods
	 **/

	//Creates an array with all pages as numbers
	$scope.getPageArray = function () {
		var pages = [];
		var maxPage = $scope.getMaxPage();
		for (var i = 1; i <= maxPage; i++) {
			pages.push(i);
		}
		return pages;
	}

	//Retrieves the max number of pages needed.
	$scope.getMaxPage = function () {
		return (Math.ceil($scope.songResults.length / $scope.perPage));
	};

	//Retrieves the data to display based on the current page.
	$scope.getPageData = function () {
		//We grab a start index, based on the current page and items per page.
		//i.e. currentPage is 1, this turns into (0 * 5), which is zero
		var start = ($scope.currentPage - 1) * $scope.perPage;
		//We then add the number of items per page to get end point
		var end = start + $scope.perPage;
		//We use slice to grab items from start to end
		return $scope.songResults.slice(start, end);
	};

	//Changes our page to a new page.
	$scope.changePage = function (newPage) {
		$scope.currentPage = newPage;
	};

	//Increments our page by one.
	$scope.nextPage = function () {
		$scope.changePage($scope.currentPage + 1);
	};

	//Decrements our page by one.
	$scope.previousPage = function () {
		$scope.changePage($scope.currentPage - 1);
	};
};

app.controller('tuneSubmitController', ['$scope', '$http', tuneSubmitController]);


//Pagination








