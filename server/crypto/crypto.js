const crypto = require('crypto');

// Wrapper around crypto module
export default class Crypto {
  sign(message, privateKey) {
    const sign = crypto.createSign('SHA256');
    sign.write(message);
    sign.end();

    console.log("Here");
    const signature = sign.sign(privateKey, 'hex');
    console.log(`Signed ${message}`);

    return signature;
  }

  verify(message, signature, publicKey) {
    const verify = crypto.createVerify('SHA256');
    verify.write(message);
    verify.end();

    const ok = verify.verify(publicKey, signature, 'hex');
    console.log(`Verfified ${message}: ${ok}`);

    return ok;
  }

  hash(message) {
    const hash = crypto.createHash('sha256');
    hash.update(message);
    const checksum = hash.digest('hex');
    return checksum;
  }

  getNonce() {
    return crypto.randomBytes(64).toString('hex');
  }
}
