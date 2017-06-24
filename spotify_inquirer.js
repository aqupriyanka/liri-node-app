'use strict';
var inquirer = require('inquirer');
var clc = require('cli-color');

var output = "";

var questions = [
  {
      type: 'input',
      name: 'song',
      message: clc.greenBright('Please enter the \"SONG\"" you would like to Search : '),
      //validate method to check if song name is not entered..
      validate: function (text) {
      if (text === undefined || text === "" || text === null) {
        return clc.redBright('Please enter the valid SONG NAME');
      }
      return true;
    }
    },
  {
    type: 'confirm',
    name: 'askAgain',
    message: clc.greenBright('Are you sure:'),
    default: true
  }
];

var playQuestions = [
  {
      type: 'confirm',
      name: 'playSong',
      message: clc.greenBright('Do you want to open any of the above tracks in browser : '),
      default: true
    },
  {
    type: 'input',
    name: 'album',
    message: clc.greenBright('Please enter the album number from the above output, you would like to play : '),
    when : function (answers) {
      return answers.playSong;
    },
    validate : function (text) {
      if (text === undefined || text === "" || text === null) {
        return clc.redBright('Please enter the valid ALBUM NUMBER');
      }
      return true;
    }
  }
];

function getSongDetails(log,callback) {   
          inquirer.prompt(questions).then(function (answers) {
            if(answers.song){
              log.info("[SPOTIFY] Question :"+questions[0].message.replace("[92m","").replace("[39m",""));
              log.info("[SPOTIFY] Answer :"+answers.song);
            }
            output = answers.song;
            if (!answers.askAgain) {
              log.info("[SPOTIFY] Question :"+questions[1].message.replace("[92m","").replace("[39m",""));
              log.info("[SPOTIFY] Answer :"+answers.askAgain);  

              getSongDetails(log,callback);
            } else {
              log.info("[SPOTIFY] Question :"+questions[1].message.replace("[92m","").replace("[39m",""));
              log.info("[SPOTIFY] Answer :"+answers.askAgain);
              return callback(output);
            }
          });
      };  


function play(log,callback) {   
          inquirer.prompt(playQuestions).then(function (answers) {
            if(!answers.playSong){
              log.info("[SPOTIFY] Question :"+questions[0].message.replace("[92m","").replace("[39m",""));
              log.info("[SPOTIFY] Answer :"+answers.playSong);
              process.exit(0);
            } else if(answers.album){
              log.info("[SPOTIFY] Question :"+questions[1].message.replace("[92m","").replace("[39m",""));
              log.info("[SPOTIFY] Answer :"+answers.album);
              output = answers.album;
              return callback(output);
            }
              
              
            // }
          });
      };

module.exports = {
 "play" : play,

  "ask" :   getSongDetails
};

