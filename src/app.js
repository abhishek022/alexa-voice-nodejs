'use strict';

const express = require('express');
const bodyParser = require('body-parser');

const REST_PORT = (process.env.PORT || 5000);
const DEV_CONFIG = process.env.DEVELOPMENT_CONFIG == 'true';

// console timestamps
require('console-stamp')(console, 'yyyy.mm.dd HH:MM:ss.l');

const app = express();

app.use(bodyParser.urlencoded({extended: true}));


app.get('/', function(req, res) {
    res.json({ message: 'The alexa voice skill is up and running.', since: (new Date()).toString() });
});

app.post('/', (req, res) => {

    console.log('POST received at root');
    console.log(req);
    console.log(res);

});

app.listen(REST_PORT, function () {
    console.log('Rest service ready on port ' + REST_PORT);
});

// var Alexa = require("alexa-sdk");

// exports.handler = function(event, context, callback) {
//     var alexa = Alexa.handler(event, context);
//     alexa.registerHandlers(handlers);
//     alexa.execute();
// };

// var handlers = {
//     'LaunchRequest': function () {
//         this.emit('SayHello');
//     },
//     'HelloWorldIntent': function () {
//         this.emit('SayHello')
//     },
//     'SayHello': function () {
//         this.emit(':tell', 'Hello World!');
//     }
// };
