'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const verify = require('./verify');

// custom module
const helloworld = require('./helloworld');

const REST_PORT = (process.env.PORT || 5000);
const DEV_CONFIG = process.env.DEVELOPMENT_CONFIG == 'true';

// console timestamps
require('console-stamp')(console, 'yyyy.mm.dd HH:MM:ss.l');

const app = express();

// app.use(bodyParser.urlencoded({extended: true}));

app.use(bodyParser.json({
    verify: function getRawBody(req, res, buf) {
        req.rawBody = buf.toString();
    }
}));

app.get('/', function(req, res) {
    res.json({ message: 'The alexa voice skill is up and running.', since: (new Date()).toString() });
});

app.post('/alexa/helloworld', verify, function(req, res){
    helloworld(req, res, function(optional, response){
        if(optional){
            res.json({ error: 'The alexa voice request failed with no response.'});
        }
        if(!optional and response){
            res.json(response);
        }        
    });
});

app.listen(REST_PORT, function () {
    console.log('Rest service ready on port ' + REST_PORT);
});
