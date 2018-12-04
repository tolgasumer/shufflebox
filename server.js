var express = require('express');
var app = express();
var port = 3000;
var host = '0.0.0.0';

var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

var votes = [0, 0, 0, 0, 0];

app.post('/sendvote', function (req, res) {
    var song_id = req.body.songid;
    console.log("Incoming POST: Vote for song ID:" + song_id);
    votes[song_id - 1]++;
    console.log(votes);
    res.end();
});

app.get('/getinfo', function (req, res) {
    console.log("Incoming GET");
    res.json({
        votesForSong1: votes[0],
        votesForSong2: votes[1],
        votesForSong3: votes[2],
        votesForSong4: votes[3],
        votesForSong5: votes[4],
    });
});

app.get('/getplaylist', function (req, res) {
    console.log("Incoming GET playlist");
    res.json(playlistItems);
    //res.end(playlistItems);
});

//Spotify requests
var Spotify = require('node-spotify-api');
 
var spotify = new Spotify({
  id: 'bddfdc9233b5493899809dcc42ca5cc3',
  secret: 'd97a1e581b5f4b4b9da348d6a0529e02'
});

var playlistItems; //request sonucu spotifydan gelecek playlist objesi
 
spotify
  .request('https://api.spotify.com/v1/playlists/3uZ0DcmMUUzola8ZC2HxRn/tracks')
  .then(function(data) {
  	// data'da items diye bi array geliyor onun track objeleri var
    //console.log(data);
    //console.log(data.items[0].track.album.images[0].url);
    playlistItems = data.items;
    console.log(playlistItems);
  })
  .catch(function(err) {
    console.error('Error occurred: ' + err); 
  });

// start the server
app.listen(port, host);
console.log('Server started! At port ' + port);