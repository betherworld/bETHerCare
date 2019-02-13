import Crypto from './crypto';
const crypto = require('crypto');

// The signer should sit on the client side.
// The signer needs to create trust for the client when the
// backend is used to make a time donation.
export default class Signer {
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

  // compute the checksum of the message and then sign it
  // the data we sign should be the donation: (receiver, amount, nonce)
  sign(receiver, amount, nonce) {
    const message = receiver + '|' + amount + '|' + nonce;
    const signature = new Crypto().sign(
      new Crypto().hash(message),
      this.privateKey
    );
    return signature;
  }

  // export public key
  exportKey() {
    return this.publicKey;
  }
}
