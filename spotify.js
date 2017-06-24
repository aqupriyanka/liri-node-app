"use strict";

(function(){

var Spotify = require('node-spotify-api');
var spotify_inquirer = require("./spotify_inquirer");
var clc = require('cli-color');
var keys = require("./keys");

var spotify = new Spotify({
  id: keys.spotifyKeys.client_id,
  secret: keys.spotifyKeys.client_secret
});
var sptracks = [];
var logg;

function searchSong(song,callback){
	spotify.search({ type: 'track', query: song }, function(err, data) {
	  if (err) {
	    return console.log('Error occurred: ' + err);
	  }
	 var tracks = JSON.parse(JSON.stringify(data));
	 var magenta = clc.magentaBright;

	 console.log(magenta("No of Tracks are : ",tracks.tracks.items.length)); 

		for(var i=0; i< tracks.tracks.items.length; i++){
			var trackItems = tracks.tracks.items[i];
			sptracks.push(trackItems.external_urls.spotify);
			var j = parseInt(i+1);
			console.log(clc.red("*************ALBUM "+j+"***************"));
			
			console.log(magenta("\tARTIST : "),clc.cyan(trackItems.artists[0].name));
			console.log(magenta("\tALBUM  : "),clc.cyan(trackItems.album.name));
			console.log(magenta("\tTITLE  : "),clc.cyan(trackItems.name));
			console.log(magenta("\tLINK   : "),clc.cyan(trackItems.external_urls.spotify));

			console.log(clc.red("*********************************"));
			// console.log('\n');

		}

		if(callback){
			callback(logg);
		}
		// var open = require('opn');
		// // open('http://sindresorhus.com');
		// console.log(sptracks[0]);
		// open(sptracks[0]);


		// require("openurl").open("http://rauschma.de");
		// var trackNos = sptracks[0].split("/");
		// console.log("track no :: ",trackNos[trackNos.length-1]);
		// const { SpotifyHelper } = require('spotify-helper');
		// let Spotify = new SpotifyHelper();
		 
		// Spotify.init()
		//   .then(function () {
		//      Spotify.play("spotify:track:3errULxUJsWssvWrskLeXH");
		//      return Spotify.play();
		//   }).catch(function (err) {
  //   		console.error(err);
  //   	});

		// Spotify.init()
  // 				.then(function () {
  //   // Tell the player to start playing this track.

  //   		Spotify.play('spotify:track:'+trackNos[trackNos.length-1]);
  //   		return Spotify.play();
  // 		}) .then(function (res) {
		//     console.log(res); // We get a status model back from the player about the change. (You will get these on most of the methods)
		//     return Spotify.pause(); // Lets pause the player.
		//   })
		//   .then(function () {
		//     return Spotify.play(); // Now play the player again.
		//   })
		//   .then(function () {
		    
		//      * This will get the status of the player. The first parameter will tell the request to wait x seconds
		//      * before the player will send back the "current" status of the player. Otherwise while polling you will get a
		//      * response when the player state changes. I.E. New track / volume change etc... Play aroud with this method
		//      * and you'll find all the neat things you can get.
		     
		//     return Spotify.getStatus(1);
		//   })
  // 		.catch(function (err) {
  //   		console.error(err); // Catch any errors thrown from the methods.
 	// 	 });


		// process.exit(0);
//COMMENTED CODE FOR PLAYING A SONG FROM SPOTIFY

		// var spotifyLocally = require("spotify-locally");
		// new spotifyLocally().play();

		//"spotify:track:0qcr5FMsEO85NAQjrlDRKo"
		// var nodeSpotifyWebHelper = require('node-spotify-webhelper');
		// var spotify = new nodeSpotifyWebHelper.SpotifyWebHelper();
		 
		// spotify.play('https://open.spotify.com/track/3errULxUJsWssvWrskLeXH',
		// 	function (err, res) {
		//   if (err) {
		//     return console.error(err);
		// 	}
		// 	console.log("PLAYING");
		//   });

		// // get the name of the song which is currently playing 
		// spotify.getStatus(function (err, res) {
		//   if (err) {
		//     return console.error(err);
		//   }	
		//  	spotify.play();
		//   console.info('currently playing:', 
		//     res.track.artist_resource.name, '-',  
		//     res.track.track_resource.name);
		// });
		// return;
		});

};

function openSongInBrowser(albumNumber){

	var open = require('opn');
	console.log("Opening Track : "+sptracks[albumNumber-1]);
	open(sptracks[albumNumber-1]);

	setTimeout(function(){process.exit(0);},1000);
};


module.exports = {
	spotify : function(log,songName){

				if(songName === undefined || songName === ""){

					spotify_inquirer.ask(log,
						function(data){
							logg = log;
							searchSong(data,
								function(log){
									spotify_inquirer.play(log,
									function(data){
										openSongInBrowser(data);
									});
								});
							
						});
				} else{
					searchSong(songName);
				}
	}

	};
})();