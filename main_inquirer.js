'use strict';
var inquirer = require('inquirer');
var clc = require('cli-color');

var output = "";

var questions = [
  {
    type: 'list',
      name: 'options',
      message: clc.cyanBright('What can I help you with : '),
      choices: ["Twitter", "Spotify", "Movies", "do-what-it-says"],
    },
  {
    type: 'confirm',
    name: 'askAgain',
    message: clc.cyanBright('Are you sure:'),
    default: true
  }
];

function getMainOption(log,callback) {   

        inquirer.prompt(questions).then(function (answers) {
          if(answers.options){
            var text = questions[0].message.replace("[96m","").replace("[39m","");

            log.info("[INTRO] Question :"+text);
            log.info("[INTRO] Answer :"+answers.options);
          }
          output = answers.options;
          if (!answers.askAgain) {
            log.info("[INTRO] Question :"+questions[1].message.replace("[96m","").replace("[39m",""));
            log.info("[INTRO] Answer :"+answers.askAgain);  

            getMainOption(log,callback);
          } else {
            log.info("[INTRO] Question :"+questions[1].message.replace("[96m","").replace("[39m",""));
            log.info("[INTRO] Answer :"+answers.askAgain);
            return callback(output);
          }
        });
      }

module.exports = {
 "ask" : getMainOption
};

//ask();

//exports.inquireObj = output;