var logParams = {
    consoleOutput : false,
    // consoleOutputLevel: ['INFO','ERROR','WARNING'],

    dateTimeFormat: "DD-MM-YYYY HH:mm:ss.S",
    outputPath: "logs/",
    fileNameDateFormat: "DDMMYYYY",
    fileNamePrefix:"myApp-"
};

var log = require('noogger').init(logParams);
module.exports = {
	'log': log
};