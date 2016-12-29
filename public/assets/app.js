'use strict';

var app = angular.module('songBird', []); 

//disables the security that won't allow the audio preview to play because it's from another site
app.config(function($sceProvider) {
	$sceProvider.enabled(false);
});


app.service('PlaylistService', ['$http', function ($http) {
	this.songs = [];

	this.getSongs = function () {
		return this.songs;
	};

	//methods
	this.loadSongs = function () {
		//Storing scope as a variable called 'self'
		var self = this;
		$http({
			method: 'GET',
			url: '/playlist'
		}).then(function (response) {
			console.log(response.data);
			self.songs = response.data;
		}).catch(function (err) {
			console.error(err);
		});
	};

	this.addSong = function (song) {
		console.log(song);
		$http({
			method: 'POST',
			url: '/playlist/add',
			data: {
				song: song
			}
		}).catch(function (err) {
			console.error(err);
		});

		var playlist = this.songs;
		var found = false;
		for (var i = 0; i < playlist.length; i++) {
			var item = playlist[i];
			if (item.trackId == song.trackId) {
				found = true;
				break;
			}
		}

		if (!found) {
			playlist.push(song);
		}
		console.log(this.songs);
	};

	this.deleteSong = function (song) {
		$http({
			method: 'POST',
			url: '/playlist/delete',
			data: {
				song: song
			}
		}).catch(function (err) {
			console.error(err);
		});
		
		var playlist = this.songs;
		for (var i = 0; i < playlist.length; i++) {
			var item = playlist[i];
			if (item.trackId == song.trackId) {
				playlist.splice(i, 1);
				break;
			}
		}
	};
}]);


app.controller('tuneSubmitController', ['$scope', '$http', 'PlaylistService', function($scope, $http, PlaylistService){
	$scope.songResults = [];
	$scope.currentPage = 1;
	$scope.perPage = 5;

	var onResultsReturned = function(response){
		$scope.songResults = response.data.results;
	};

	var onError = function(errors){
		console.log(errors);
	};

	$scope.searchArtist = function(artist){
	  $http.jsonp('http://itunes.apple.com/search', {
	  	params: {
	  		'callback': 'JSON_CALLBACK',
	  		'term': artist
	  	}
	  }).then(onResultsReturned).catch(onError);
	};

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

		//We grab the items out of our results
		//And return them
		var songsToShow = [];
		for (var i = start; i < end; i++) {
			var song = $scope.songResults[i];
			songsToShow.push(song);
		}
		return songsToShow;
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

	//Playlist methods
	$scope.addToPlaylist = function (song) {
		PlaylistService.addSong(song);
	};

}]);


//adding and subtracting a song

app.controller('playlistController', ['PlaylistService', '$scope', function (PlaylistService, $scope) {
 	$scope.getSongs = function () {
 		return PlaylistService.getSongs();
 	};

 	$scope.getSongCount = function () {
 		return $scope.getSongs().length;
 	};

 	$scope.deleteFromPlaylist = function (song) {
		PlaylistService.deleteSong(song);
	};

 	$scope.getDuration = function () {
 		var total = 0;
 		var songs = $scope.getSongs();
 		for (var i = 0; i < songs.length; i++) {
 			var song = songs[i];
 			var duration = song.trackTimeMillis / 1000;
 			total+= Number(duration);
 		}

 		return Math.round(total);
 	};
}]);

app.run(['PlaylistService', function (PlaylistService) {
	PlaylistService.loadSongs();
}]);