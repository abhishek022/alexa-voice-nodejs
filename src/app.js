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
    res.json({ message: 'The alexa voice skill is up and running test pourab.', since: (new Date()).toString() });
});

app.post('/alexa', verify, helloworld);

app.listen(REST_PORT, function () {
    console.log('Rest service ready on port ' + REST_PORT);
});
