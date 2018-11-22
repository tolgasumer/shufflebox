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

// start the server
app.listen(port, host);
console.log('Server started! At port ' + port);