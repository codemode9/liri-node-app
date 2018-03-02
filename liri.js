//**********************dep and vars************************//

require('dotenv').config({path: __dirname + '/.env'})

var result = dotenv.config();
var request = require("request");
var keys = require("./keys.js");
var fs = require('fs');
var spotify = require('node-spotify-api');
var twitter = require('twitter');
var spotify = require(keys.spotify);
var client = new twitter(keys.twitter);
var nodeArgs = process.argv;
var userCmd = process.argv[2];
var userInp = process.argv[3];
var search = '';
search = search.trim();
search = search.toLowerCase();

//****************loop through cmds**********************//

for ( i = 3; i < nodeArgs.length; i++) {
    search = `${search}" "${nodeArgs[i]}`;
};

var readUserEntry = function(userCmd, search) {
    switch (userCmd) {
        case "my-tweets": grabTweets();
        break;
        case "spotify-this-song": grabSpotify();
        break;
        case "movie-this": grabOmdb();
        break;
        case "do-what-it-says": whatItSays();
    }
};

//*******************tweets cmd***************************//

var grabTweets = function() {
    var twentyTweets = 20;
    var params = {screen_name: 'spaceman_piff'};
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
      if (!error) {
        for (var i = 0; i<twentyTweets; i++){
          console.log(`${tweets[i].text} ${tweets[i].created_at}`);
        }
      }
    });
};

//**********************spotify cmd***********************//

var grabSpotify = function spotifyThis(type, song) {
    if (userInp === undefined) {
        console.log("Choose a song!");
        spotify.search(
            {
                type: track,
                query: song || 'The Sign' && 'Ace of Base'
            },function(err, data) {
                if (err) {
                    console.log(err);
                    return console.log('Error occurred: ' + err);
                }
                console.log('Artist: ', data.tracks.items[0].artists[0].name);
                console.log('Song: ', data.tracks.items[0].name);
                console.log('Preview: ', data.tracks.items[0].preview_url);
                console.log('Album: ', data.tracks.items[0].album.name);
            });
    }
    else {
    spotify.search(
        {
            type: track,
            query: userInp,
            limit: 1
        }, function(err, data){
            console.log("Artist: ", data.tracks.items[0].artists[0].name);
            console.log("Song: ", data.tracks.items[0].name,);
            console.log("Preview: ", data.tracks.items[0].preview_url);
            console.log("Album: ", data.tracks.items[0].album.name);
        });
    }
};

//***********************omdb cmd******************************//


var grabMovie = function grabMovie() {
        if (userInp === undefined) {
            request('http://www.omdbapi.com/?apikey=trilogy&t=Mr. Nobody', function(error, response, body){
                var flick = JSON.parse(body);
                console.log(`Title : ${flick.Title}`);
                console.log(`Year: ${flick.Year}`);
                console.log(`IMDB Rating: ${flick.imdbRating}`);
                console.log(`Rotten Tomatoes Rating: ${flick.Ratings[2]}`);
                console.log(`Country: ${flick.Country}`);
                console.log(`Language: ${flick.Language}`);
                console.log(`Plot: ${flick.Plot}`);
                console.log(`Actors: ${flick.Actors}`);
            });
        } else {
            request(omdbUrl + userInput, function(error, response, body){
                var flick = JSON.parse(body);
                console.log(`Title : ${flick.Title}`);
                console.log(`Year: ${flick.Year}`);
                console.log(`IMDB Rating: ${flick.imdbRating}`);
                console.log(`Rotten Tomatoes Rating: ${flick.Ratings[2]}`);
                console.log(`Country: ${flick.Country}`);
                console.log(`Language: ${flick.Language}`);
                console.log(`Plot: ${flick.Plot}`);
                console.log(`Actors: ${flick.Actors}`);
            });
        }
    };

//*******************whatItSays cmd**********************************/

function whatItSays() {
    fs.readFile('random.txt', 'utf-8', function(err, data){
        if (err) {
            throw err;
        }
        console.log(data);
        var splitter = data.split(',');

        grabSpotify('readFile', splitter[1]);
    });
};