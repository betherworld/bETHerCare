import Crypto from './crypto';
const crypto = require('crypto');

// the verifier should sit on the server to check all transactions
// observed on the blockchain when addTime is called
export default class Server {
  // The message is the transaction that we want verfied
  // Input: message=(clientPk, amount); signature; devicePk
  verify(clientPk, amount, signature, devicePk) {
    // generate the signature
    const message = clientPk + '|' + amount;

    return new Crypto().verify(
      new Crypto().hash(message),
      signature,
      devicePk
    );
  }
}
