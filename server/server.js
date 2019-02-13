import path    from 'path';
import express from 'express';
import Api     from './api';

var server = express();
// note that now server.js is exposed as well
server.use(express.static('dist'));

const DIST_DIR = __dirname;
const HTML_FILE = path.join(DIST_DIR, 'index.html')

// register API
new Api(server).register();

// Main file
server.get('/', (req, res) => {
    res.sendFile('app/index.html');
})

// start litening for requests
var PORT = 3000;
server.listen(PORT, function() {
  console.log('http://localhost:' + PORT);
});
