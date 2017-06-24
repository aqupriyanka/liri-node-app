'use strict';
var inquirer = require('inquirer');
var clc = require('cli-color');
var output = "";

var questions = [
  {
    type: 'input',
      name: 'movie',
      message: clc.greenBright('Please enter the \"MOVIE NAME\"" for which you would like to have information : '),
    },
  {
    type: 'confirm',
    name: 'askAgain',
    message: clc.greenBright('Are you sure:'),
    default: true
  }
];

function getMovieOptions(log,callback) {   
        inquirer.prompt(questions).then(function (answers) {
          if(answers.movie){
            var text = questions[0].message.replace("[92m","").replace("[39m","");
            log.info("[OMDB] Question :"+text);
            log.info("[OMDB] Answer :"+answers.movie);
          }
          output = answers.movie;
          if (!answers.askAgain) {
            log.info("[OMDB] Question :"+questions[1].message.replace("[92m","").replace("[39m",""));
            log.info("[OMDB] Answer :"+answers.askAgain);  

            getMovieOptions(log,callback);
          } else {
            log.info("[OMDB] Question :"+questions[1].message.replace("[92m","").replace("[39m",""));
            log.info("[OMDB] Answer :"+answers.askAgain);
            return callback(output);
          }
        });
      }

module.exports = {
 "ask" : getMovieOptions
};
