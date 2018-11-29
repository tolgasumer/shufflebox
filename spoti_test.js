var Spotify = require('node-spotify-api');
 
var spotify = new Spotify({
  id: 'bddfdc9233b5493899809dcc42ca5cc3',
  secret: 'd97a1e581b5f4b4b9da348d6a0529e02'
});
 
spotify
  .request('https://api.spotify.com/v1/playlists/3uZ0DcmMUUzola8ZC2HxRn/tracks')
  .then(function(data) {
  	// data'da items diye bi array geliyor onun track objeleri var
    //console.log(data);
    console.log(data.items[1].track.name); 
  })
  .catch(function(err) {
    console.error('Error occurred: ' + err); 
  });
  //spotify:user:11100316938:playlist:3uZ0DcmMUUzola8ZC2HxRn

  spotify
  .request('https://api.spotify.com/v1/playlists/3uZ0DcmMUUzola8ZC2HxRn/tracks')
  .then(function(data) {
    //console.log(data);
    console.log(data.items[1].track.name); 
  })
  .catch(function(err) {
    console.error('Error occurred: ' + err); 
  });

