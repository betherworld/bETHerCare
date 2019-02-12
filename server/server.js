require('babel-register')({
    presets: [ 'env' ]
}); // ES6

var express = require('express');
var api     = require('./api');

var server = express();
server.use(express.static('app'))

// register API
new api.Api(server).register();

// start litening for requests
var PORT = 3000;
server.listen(PORT, function() {
  console.log('http://localhost:' + PORT);
});
