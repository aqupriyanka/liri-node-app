'use strict';
var inquirer = require('inquirer');
var clc = require('cli-color');

var output = "";
var lineSeparator = "~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~";

var questions = [
  {
    type: 'input',
      name: 'name',
      message: clc.yellowBright(lineSeparator+'\n\t\tWELCOME TO LIRI\n'+lineSeparator+'\nPlease enter your NAME : '),
      validate : function (text) {
				      if (text === undefined || text === "" || text === null) {
				        return clc.redBright('Please enter the valid NAME');
				      }
				      return true;
				 }
    },
  {
    type: 'confirm',
    name: 'askAgain',
    message: clc.yellowBright('Are You Doing Fine Today'),
    default: true
  }
];

function getWelcomeMessage(callback) {   

        inquirer.prompt(questions).then(function (answers) {
          // if(answers.options){
          //   var text = questions[0].message.replace("[96m","").replace("[39m","");

          //   log.info("Question :"+text);
          //   log.info("Answer :"+answers.options);
          // }
          output = answers.options;
          if (!answers.askAgain) {
          	console.log(clc.yellowBright("Hope You Will Feel Good After Using Me !!!"));
          }
          //   log.info("Question :"+questions[1].message.replace("[96m","").replace("[39m",""));
          //   log.info("Answer :"+answers.askAgain);  

          //   getMainOption(log,callback);
          // } else {
          //   log.info("Question :"+questions[1].message.replace("[96m","").replace("[39m",""));
          //   log.info("Answer :"+answers.askAgain);
            return callback();
          // }
        });
      }

module.exports = {
 "welcomeMessage" : getWelcomeMessage
};

