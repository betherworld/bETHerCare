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
}
