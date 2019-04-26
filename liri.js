require("dotenv").config();

var keys = require("./keys.js");

var spotify = new Spotify(keys.spotify);

function spotifyThisSong() {
  console.log(`\n - - - - -\n\nSEARCHING FOR..."${userQuery}"`);
    if (error) {
      return console.log('Error occurred: ' + error);
    }
      let spotifyArr = data.tracks.items;

      for (i = 0; i < spotifyArr.length; i++) {
        console.log(`DOPE TUNES! \n\nArtist: ${data.tracks.items[i].album.artist[0].name} \nSong: ${data.tracks.items[i].name}\nSpotify Link: ${data.tracks.items[i].external_urls.spotify}\nAlbum: ${data.tracks.items.[i].album.name}\n\n - - - - -`)


      };





}

spotify.search({ type: 'track', query: userQuery, limit: 1}, function (error, data){} )



function concertThis() {};
("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp")




function movieThis() {};
