'use strict';

const VERSION = '1.0';

module.exports = function(req, res) {

    if (req.body.request.type === 'LaunchRequest') {
        res.json(
            buildResponse(
                { dateRequested: true },
                '<speak>Vinod,<break time="1s"/> Hello World!</speak>',
                {},
                false
            )
        );

    } else if (req.body.request.type === 'SessionEndedRequest') {

       if (req.body.request.reason === 'ERROR') {
           console.error('Alexa ended the session due to an error');
       }
       /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
        Per Alexa docs, we shouldn't send ANY response here... weird, I know.
        * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

    }
};

function buildResponse(session, speech, card, end) {
    return {
        version: VERSION,
        sessionAttributes: session,
        response: {
            outputSpeech: {
                type: 'SSML',
                ssml: speech
            },
            card: card,
            shouldEndSession: !!end
        }
    };
}


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
