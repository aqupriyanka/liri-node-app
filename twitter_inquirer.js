'use strict';
var inquirer = require('inquirer');
var clc = require('cli-color');

var output = "";

var questions = [
  {
    type: 'list',
      name: 'options',
      message: clc.greenBright('Please enter the options you would like to Explore for TWITTER : '),
      choices: ["Get Followers", "Get Tweets", "Get Friends List"],
    },
  {
    type: 'confirm',
    name: 'askAgain',
    message: clc.greenBright('Are you sure:'),
    default: true
  }
];

function getTwitterDetails(log,callback) {   
        inquirer.prompt(questions).then(function (answers) {
          if(answers.options){
            log.notice("[TWITTER] Question :"+questions[0].message.replace("[92m","").replace("[39m",""));
            log.notice("[TWITTER] Answer :"+answers.options);
          }
          output = answers.options;
          if (!answers.askAgain) {
            log.info("[TWITTER] Question :"+questions[1].message.replace("[92m","").replace("[39m",""));
            log.info("[TWITTER] Answer :"+answers.askAgain);  
            getTwitterDetails(log,callback);
          } else {
            log.info("[TWITTER] Question :"+questions[1].message.replace("[92m","").replace("[39m",""));
            log.info("[TWITTER] Answer :"+answers.askAgain);
            return callback(output);
          }
        });
      }

module.exports = {
 "ask" : getTwitterDetails
};
