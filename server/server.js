import path    from 'path';
import express from 'express';
import Api     from './api';

import Signer from './crypto/signer';
import Verfier from './crypto/verifier';

var server = express();
// note that now server.js is exposed as well
server.use(express.static('dist'));

const DIST_DIR = __dirname;
const HTML_FILE = path.join(DIST_DIR, 'index.html')

// register API
new Api(server).register();

const receiver = '0x33';
const amount = 5;
const nonce = 200;

let signer = new Signer();
const signature = signer.sign(receiver, amount, nonce);
const publicKey = signer.exportKey();
new Verfier().verify(receiver, amount, nonce, signature, publicKey);

// start litening for requests
var PORT = 3000;
server.listen(PORT, function() {
  console.log('http://localhost:' + PORT);
});
