"use strict";
(function(){
	var keys = require("./keys");
	var clc = require('cli-color');


	function init(keys){
		var Twitter = require('twitter');
	   	var client = new Twitter({
		  consumer_key: keys.consumer_key,
		  consumer_secret: keys.consumer_secret,
		  access_token_key: keys.access_token_key,
		  access_token_secret: keys.access_token_secret
		});
		return client;
	};

	function my_followers(keys){
		   	var client = init(keys);
			client.get('followers/list', function(error, tweets, response) {
			  if(error) throw error;
			  console.log("\n");
			  console.log(clc.red("********************FOLLOWERS*******************"));
			  console.log(clc.magentaBright("Number of Your Followers are : "),clc.cyan(tweets.users.length));
			  for(var i=0; i<tweets.users.length; i++){
			  	console.log("\t"+parseInt(i+1) + ".) " + clc.cyan(tweets.users[i].name));
			  }
			  console.log(clc.red("*******************END OF FOLLOWERS********************"));
			  console.log("\n");
			  process.exit(0);
			});
			return 0;
		};


	function my_friends(keys){
			var client = init(keys);
			client.get('friends/list', function(error, tweets, response) {
			  if(error) throw error;
			  console.log("\n");
			  console.log(clc.red("********************FRIENDS*******************"));
			  console.log(clc.magentaBright("Number of Your Friends are : "),clc.cyan(tweets.users.length));
			  for(var i=0; i<tweets.users.length; i++){
			  	console.log("\t"+parseInt(i+1) + ".) " + clc.cyan(tweets.users[i].name));
			  }
			  console.log(clc.red("*******************END OF FRIEND LIST********************"));
			  console.log("\n");

			  process.exit(0);
			  
			});
			return 0;
		};

	function my_tweets(keys){
			var client = init(keys);
			client.get('statuses/user_timeline', function(error, tweets, response) {
			  if(error) throw error;
			  console.log("\n");
			  console.log(clc.red("********************MY TWEETS*******************"));
			  console.log(clc.magentaBright("Number of Your tweets are : "),clc.cyan(tweets.length));

			  for(var i=0; i<tweets.length; i++){
			  	console.log("\t"+parseInt(i+1) + ".) " + clc.cyan(tweets[i].text) + " CREATED AT : "+clc.yellow(tweets[i].created_at));
			  }
			  console.log(clc.red("*******************END OF MY TWEETS*******************"));
			  console.log("\n");

			  process.exit(0);
			  
			});
			return 0;
		};



	function selectOption(option,log){
			switch(option){
				case "Get Followers" : my_followers(keys.twitterKeys);break;
				case "Get Tweets" : my_tweets(keys.twitterKeys);break;
				case "Get Friends List" : my_friends(keys.twitterKeys);break;

			}
			return;
		};

		
	
	module.exports = {
		my_twitter : function(log){
				var inquireObj = require("./twitter_inquirer").ask(log,
					function(data){
						selectOption(data,log);return;});
				
			}
		

		
	};

})();

	