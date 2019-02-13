const crypto = require('crypto');

export default class Client {
  constructor() {
    const { privateKey, publicKey } = crypto.generateKeyPairSync('ec', {
      namedCurve: 'sect239k1',
      publicKeyEncoding:  { type: 'spki', format: 'pem' },
      privateKeyEncoding: { type: 'pkcs8', format: 'pem' }
    });

    this.privateKey = privateKey;
    this.publicKey  = publicKey;

    const message = 'test';
    const signature = this.sign(message);
    this.verify(message, signature, this.publicKey);
  }

  sign(message) {
    const sign = crypto.createSign('SHA256');
    sign.write(message);
    sign.end();

    const signature = sign.sign(this.privateKey, 'hex');
    console.log(`Signed ${message}`);

    return signature;
  }

  verify(message, signature, publicKey) {
    const verify = crypto.createVerify('SHA256');
    verify.write(message);
    verify.end();

    const ok = verify.verify(publicKey, signature, 'hex');
    console.log(`Signature ${ok}`);

    return ok;
  }
}
