import Crypto from './crypto';
const crypto = require('crypto');

// the verifier should sit on the server to check all transactions
// observed on the blockchain when addTime is called
export default class Verifier {
  // The message is the transaction that we want verfied
  // Input: message=(receiver, amount, nonce); signature; publicKey
  verify(receiver, amount, nonce, signature, publicKey) {
    const message = receiver + '|' + amount + '|' + nonce;
    return new Crypto().verify(
      new Crypto().hash(message),
      signature,
      publicKey
    );
  }
}
