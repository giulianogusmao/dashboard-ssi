var express = require('express');
var consign = require('consign');
var bodyParser = require('body-parser');
var cors = require('cors');


module.exports = function () {
    var app = express();

    // use it before all route definitions 
    app.use(cors({ origin: 'http://localhost:4200' }));

    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());

    consign()
        .include('controllers')
        .into(app);

    return app;
}