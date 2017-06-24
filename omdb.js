"use strict";

(function(){

var inquirer = require("./movie_inquirer");
var clc = require('cli-color');

function movieDetails(movie){
	var request = require('request');
	var url = 'http://www.omdbapi.com/?t='+encodeURIComponent(movie)+'&y=&plot=short&apikey=40e9cece';
	request(url, 
		function (error, response, body) {
		if (error) {
			    return console.log('Error occurred: ' + error);
			  }
			  else{

				var movies = JSON.parse(body);
				var msg = clc.cyan;
				console.log("\n");
				console.log(clc.red("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ MOVIE DETAILS ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~"));
				console.log(clc.magentaBright("********* Title of the movie : \t\t")+msg(movies.Title));
				// console.log("\t"+movies.Title);

				console.log(clc.magentaBright("********* Release Year : \t\t")+msg(movies.Year));
				// console.log("\t"+movies.Year);

				console.log(clc.magentaBright("********* IMDB Rating : \t\t")+msg(movies.imdbRating));
				// console.log("\t"+movies.imdbRating);

				console.log(clc.magentaBright("********* Movie produced in : \t\t")+msg(movies.Country));
				// console.log("\t"+movies.Country);

				console.log(clc.magentaBright("********* Language of the movie : \t")+msg(movies.Language));
				// console.log("\t"+movies.Language);

				console.log(clc.magentaBright("********* Plot of the movie : \t\t")+msg(movies.Plot));
				// console.log("\t"+movies.Plot);

				console.log(clc.magentaBright("********* Actors in the movie : \t")+msg(movies.Actors));
				// console.log("\t"+movies.Actors);

				console.log(clc.magentaBright("********* Movie Website : \t\t")+msg(movies.Website));
				// console.log("\t"+movies.Website);
				console.log(clc.red("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ END OF DETAILS ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~"));

			    console.log('\r\n');
			    if(movie === "Mr. Nobody"){
			    	console.log(clc.magentaBright("If you haven't watched \"Mr. Nobody,\" then you should:"+ clc.yellow('<http://www.imdb.com/title/tt0485947/>')));
			    	console.log(clc.magentaBright("It's on Netflix!"));
			    }

			    process.exit(0);
			   }

	});
}

module.exports = {
	
	getMovieDetails : function(log){
						inquirer.ask(log,
						function(data){
							if(data === undefined || data === ""){
								movieDetails("Mr. Nobody");
							}else{
								movieDetails(data);
							}
						});
				}

};

})();

