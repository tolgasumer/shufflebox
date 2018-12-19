var express = require('express');
var app = express();
var port = 3000;
var host = '0.0.0.0';
var spotifyToken = 'BQBCNgoCBG5WmQvRkcg0HV1fUDWJ4r4G9lieVtNnxQBlFVWm82LAeyTWH4aDgT6jkAqx55k5bOVdH1filbZzthaMOp_AujDNxcGBHSKLvwvxLoG9-tKim_B840rgFK4E4Kw16MzXstbA8tKerwy6_ZPzJI8LWlP1xQag6PYgWEBAYeli_F4emM0L1n856ZXv5pTIybmJImd_A3Heyx4LslM4cu2RxtYoYwI4DG3BY6csvRPMVSwlXBs9SC5CK0bp5sDL0L_iEN7Ru3dPdxne'

var bodyParser = require('body-parser');
const axios = require('axios')
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
  //console.log("Incoming GET");
  res.json({
    votesForSong1: votes[0],
    votesForSong2: votes[1],
    votesForSong3: votes[2],
    votesForSong4: votes[3],
    votesForSong5: votes[4],
    lastWinner: VotingWinner(),
    currentlyPlayingName: nowPlayingName,
    currentlyPlayingUrl: nowPlayingImageUrl
  });
});

app.get('/getplaylist', function (req, res) {
  //console.log("Incoming GET playlist");
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

//get playlist call
function GetPlaylist() {
spotify
  .request('https://api.spotify.com/v1/playlists/3uZ0DcmMUUzola8ZC2HxRn/tracks')
  .then(function (data) {
    // data'da items diye bi array geliyor onun track objeleri var
    //console.log(data);
    //console.log(data.items[0].track.album.images[0].url);
    playlistItems = data.items;
    //console.log(playlistItems);
  })
  .catch(function (err) {
    console.error('Error occurred: ' + err);
  });
}

//10sn interval
setInterval(function () { console.log(VotingWinner()); }, 10000);
setInterval(function () { GetCurrentlyPlaying(); }, 3000);
setInterval(function () { PutWinningSongToFirst(); }, 15000);
setInterval(function () { GetPlaylist(); }, 10000);

function VotingWinner() {
  //console.log("max vote:"+votes.indexOf(Math.max(...votes)));
  return votes.indexOf(Math.max(...votes));
}

var nowPlayingName;
var nowPlayingImageUrl;
function GetCurrentlyPlaying() {
  axios.get('https://api.spotify.com/v1/me/player/currently-playing', {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + spotifyToken
    }
  })
    .then((response) => {
      //console.log(response)
      //console.log(response.data.item.name);
      nowPlayingName = response.data.item.name;
      //console.log(response.data.item.album.images[0].url);
      nowPlayingImageUrl = response.data.item.album.images[0].url;
    })
    .catch((error) => {
      console.log(error);
    })
}

function PutWinningSongToFirst() {
  axios.put('https://api.spotify.com/v1/playlists/3uZ0DcmMUUzola8ZC2HxRn/tracks',
  {
    range_start: VotingWinner(),
    insert_before: 1
  }, 
  {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + spotifyToken
    }
  })
    .then((response) => {
      //console.log(response)
      //console.log(response.data);
    })
    .catch((error) => {
      console.log(error);
    })
}



// start the server
app.listen(port, host);
console.log('Server started! At port ' + port);