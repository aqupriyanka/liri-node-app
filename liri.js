   "use strict";
   var inquireObj;
   var fs = require("fs");
   (function(){
   	// var Twitter = require('twitter');

   	//DO LOGGING
   	var logg = require("./logger").log;



      var arg0 = process.argv0.split("\\");
   	var arg1 = process.argv[1].split("\\");
   	var cmd = arg0[arg0.length-1] + " "+ arg1[arg1.length-1] + " " + process.argv.splice(2);
   	logg.info(cmd);

      

      var username = require("./inquirer").welcomeMessage(getMainInquirer);
   	function getMainInquirer(){
         inquireObj = require("./main_inquirer").ask(logg,
            function(data){
               selectOption(data,logg);
               return;
            });
      
   }


   })();

   function selectOption(option,log,name){
   		switch(option){

   		case "Twitter" : getTwitter(log);break;
   		case "Spotify" : getSpotify(log,name);break;
   		case "Movies" : omdb(log);break;
   		case "do-what-it-says" : readFileSystem(log);break;
         default : console.log("Please select the valid option.");break;

   		// case default : break;
   	}
   	return;
   }

   function getTwitter(log){
   	var Twitter = require('./twitter');
   	Twitter.my_twitter(log);
   	return;
   }

   function getSpotify(log,songName){
   	 var spotify = require("./spotify");
   	 spotify.spotify(log,songName);
   	 return;

   }

   function omdb(log){
   	var omdb = require("./omdb");
   	 omdb.getMovieDetails(log);
   	 return;
   }

   function readFileSystem(log){

      fs.readFile("random.txt",'utf-8', function(err,data){
            if(err){
                return console.log(err);
            }
            var fileData = data.split(",");
            log.info("[FILESYSTEM] Command from FileSystem : "+fileData[0] + " " + fileData[1]);
            selectOption(fileData[0],log,fileData[1]);

         });

   }
   