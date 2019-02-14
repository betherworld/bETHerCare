import Crypto from './crypto';
const crypto = require('crypto');

export default class Client {
  constructor() {
    // generate private and public keys
    const { privateKey, publicKey } = crypto.generateKeyPairSync('ec', {
      namedCurve: 'sect239k1',
      publicKeyEncoding:  { type: 'spki', format: 'pem' },
      privateKeyEncoding: { type: 'pkcs8', format: 'pem' }
    });

    this.privateKey = privateKey;
    this.publicKey  = publicKey;
  }

  // export public key
  exportKey() {
    return this.publicKey;
  }

  sign(clientPk, amount, counter) {
    // to sign the message, together with the nonce
    const message = clientPk + '|' + amount + '|' + counter;

    // get the signature
    const signature = new Crypto().sign(
      new Crypto().hash(message),
      this.privateKey
    );
    return signature;
  }

  // client needs to verify blockchain
  verify(clientPk, amount, counter, signature) {
    // generate the signature
    const message = clientPk + '|' + amount + '|' + counter;

    return new Crypto().verify(
      new Crypto().hash(message),
      signature,
      clientPk
    );
  }
}
