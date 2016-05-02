require('babel-polyfill');
require('babel-register');
require("clim")(console, true);

require('./config/config');

var nconf = require('nconf');
var express = require('express');

var app = express();

require('./config/express')(app);

var port = process.env.PORT || nconf.get('port');

app.listen(port, function () {
	console.log('Express server listening on port ' + port);
});

