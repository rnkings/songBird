"use strict";

var app = angular.module('songBird', ["$http", "$scope"]);

app.controller('tuneSubmitController', function($scope) {
	$http({
		method: 'POST',
		url: "https://itunes.apple.com/search?term=/"+userInputTuneName,
		data: data
	})
	.then(function(response){
		$scope.data = response.data;


});



// function getTune(userInputTuneName){
// 	$.ajax({
// 		url: "https://itunes.apple.com/search?term=/"+userInputTuneName,
// 		type: "GET",
// 		dataType: "JSONP"
// 	}).done(function(data){
// 		console.log(data);
// 		console.log(data.results[0].trackName);
// 		printToPage(data);
// 	}).fail(function(error){
// 		console.log("an error occured!");
// 	});
// }



// function printToPage(data){
// 	for(var i = 0; i < data.results.length; i++){
// 		var result = data.results[i];
// 		console.log(result.trackName);
// 		console.log(result);
// 		var html = "<hr>" + " Tune Name: " + result.trackName + "<br>" + " Artist: " + result.artistName + "<br>" + " Albumn: " + result.collectionName + "<br>" + "<br>"
// 		html += "<audio controls><source src='" + result.previewUrl + "' type='audio/mpeg'></audio>" + "<br>" + "<br>" + "<img src='" + result.artworkUrl100 + "' height='120' width='120'>";
// 		document.getElementById("printArea").innerHTML += html; 
// 	}
// }

// function getUserInput(){
// 	//document.getElementByID.value
// 	return document.getElementById("topSpace").value;
// 	//return
// }

// $("#buttonTune").click(function(){
// 	var userInputTuneName = getUserInput();
// 	getTune(userInputTuneName);
// });






// app.controller('SignInController', ['DataService', '$http', '$scope', '$rootScope', function (DataService, $http, $scope, $rootScope) {
// 	//we use self inside the "then" callback
// 	var self = this;
// 	this.login = function () {
// 		$http({
// 			method: 'POST',
// 			url: '/submit/signInForm',
// 			data: {
// 				firstname: $scope.firstname,
// 				lastname: $scope.lastname,
// 				weddingname: $scope.weddingname
// 			}
// 		}).then(function (response) {
// 			console.log(response);
// 			//Set us as logged in
// 			$rootScope.loggedIn = true;
// 			//Set our data
// 			DataService.setUser(response.data.user);
// 			DataService.setWedding(response.data.wedding);
// 			//Load more data via controller methods.
// 			self.loadGuestbookData();
// 			self.loadInvitationData();
// 		}).catch(function (error) {
// 			console.error(error);
// 			document.getElementById("error").innerHTML = "Sorry you have not been approved for this wedding yet or the wedding has not yet been created!";
// 		});
// 		// $rootScope.loggedIn = true;
// 	};

