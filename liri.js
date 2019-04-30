require("dotenv").config();

var axios = require("axios");
var moment = require("moment");
var spotifyKeys = require("./keys.js")
var Spotify = require("node-spotify-api");

var spotify = new Spotify(spotifyKeys.spotify);

const [node, file, ...args] = process.argv;

// if (args[0] === "movie-this") {
//   if (args[0] === undefined) {
//     getMovie("Mr. +Nobody");
//   }
//   else {
//     getMovie(args.slice(1).join("+"));
//   }
// };

// if (args[0] === "spotify-this-song") {
//   if (args[1] === undefined) {
//     spotifySong("See you again");
//   }
//   else {
//     var songTitle = args.slice(1).join("");
//     spotifySong(songTitle);
//   }
// };

if (args[0] === "do-what-it-says") {
  fs.readFile("random.txt", "utf8", function (error, data) {
    if (error) {
      return console.log(error);
    };
  });
}



var command = process.argv[2];
if (command === "movie-this") {
  if (process.argv[3] === undefined) {
    getMovie("Mr. Nobody")
  }
  else {
    getMovie(process.argv.slice(3).join("+"))
  }
} else if (command  === "spotify-this-song") {
  if (process.argv[3] === undefined) {
    spotifySong("See you again")
  }
  else {
    spotifySong(process.argv.slice(3).join(" "))
  }
} else if (command  === "concert-this") {
    if (process.argv[3] === undefined) {
      concertThis("Wu Tang")
    }
    else {
      concertThis(process.argv.slice(3).join(" "))
    }
}


    function concertThis(band) {
      var queryURL = "https://rest.bandsintown.com/artists/" + band + "/events?app_id=codingbootcamp";
      axios.get(queryURL)
      .then(function (response) {
        console.log(response.data);
        var jsonData = response.data;

        for(var i=0; i<jsonData.length; i++){
//Name of the venue
// Venue location
// Date of the Event (use moment to format this as "MM/DD/YYYY")
          console.log("Name of the Venue : " + jsonData[i].venue.name);
          console.log("Venue Location : " + jsonData[i].venue.city + ", " + jsonData[i].venue.region + " " + jsonData[i].venue.country);
          console.log("Date of the Event : " + moment(jsonData[i].datetime).format("MM/DD/YYYY"));
        }
      })
      .catch(function (error) {
        console.log(error);
      });
    }


    function spotifySong(songName) {
      spotify.search({ type: 'track', query: songName, limit: 5 }, function (err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }

        data.tracks.items.forEach(function (element) {
          console.log("------");

          console.log(`Artist: ${element.artists[0].name}`);
          console.log(`Song: ${songName}`);
          console.log(`Spotify Preview Link: ${element.preview_url}`);
          console.log(`Album: ${element.album.name}`);
        });
      });
    }

      function getMovie(movieName) {
        console.log(movieName)
        axios
          .get("http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy")
          .then(function (movie) {
            console.log("");
            console.log(`Title: ${movie.data.Title}`);
            console.log(`Released: ${movie.data.Year}`);
            console.log(`IMDB Rating: ${movie.data.Ratings[0].Value}`);
            console.log(`Rotten Tomatoes Rating: ${movie.data.Ratings[0].Value}`);
            console.log(`Produced in: ${movie.data.Country}`);
            console.log(`Plot: ${movie.data.Plot}`);
            console.log(`Starring: ${movie.data.Actors}`);

          })
          .catch(function (err) {
            console.log(err);
          });
      };
