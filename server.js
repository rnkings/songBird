'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');
var app = express();

// ROOT DIRECTORY
app.use('/', express.static(__dirname + '/public'));

app.use( bodyParser.json() );       // to support JSON-encoded bodies
//HTTP?
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

var readPlaylist = function () {
	return JSON.parse(fs.readFileSync(__dirname + '/playlist.json', 'utf8'));
};

var writePlaylist = function (data) {
	fs.writeFileSync(__dirname + '/playlist.json', JSON.stringify(data));
};

//Playlist routes
app.get('/playlist', function (req, res) {
	res.send(readPlaylist());
});

app.post('/playlist/add', function (req, res) {
	var song = req.body.song;
	var playlist = readPlaylist();
	console.log(playlist);

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

	writePlaylist(playlist);
	res.send('Success');
});

app.post('/playlist/delete', function (req, res) {
	var song = req.body.song;
	var playlist = readPlaylist();
	
	for (var i = 0; i < playlist.length; i++) {
		var item = playlist[i];
		if (item.trackId == song.trackId) {
			playlist.splice(i, 1);
			break;
		}
	}

	writePlaylist(playlist);
	res.send('Success');
});

app.listen(3002, function () {
  console.log('See this website at localhost:3002');
});