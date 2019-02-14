import Crypto from './crypto';
const crypto = require('crypto');

// Anyone can verify all online transactions: i.e. act as server.

// the verifier should sit on the server to check all transactions
// observed on the blockchain when addTime is called
export default class Server {
  // The message is the transaction that we want verfied
  // Input: message=(clientPk, amount, counter); devicePk; signature;
  verify(clientPk, amount, counter, devicePk, signature) {
    // generate the signature
    const message = clientPk + '|' + amount + '|' + counter;

    return new Crypto().verify(
      new Crypto().hash(message),
      signature,
      devicePk
    );
  }
}
