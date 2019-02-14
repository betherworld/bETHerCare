import Crypto from '../crypto/crypto';
import Web3Provider from './web3provider';
import Server from '../crypto/server';
import Client from '../crypto/client';

// Blockchain API
export default class TranscationClient extends Web3Provider {
  constructor() {
    super();
  }

  isValid(clientPk, devicePk, amount, counter, clientSig, deviceSig) {
    // we spend money only on valid transactions
    // verify the Device signature
    if (new Server().verify(clientPk, amount, counter, devicePk, deviceSig)) {
      return false;
    }

    // verify the client signature
    if (new Client().verify(clientPk, amount, counter, clientSig)) {
      return false;
    }

    return true;
  }

  // TODO: not tested
  handleTransaction(conn, clientPk, devicePk, amount, counter, clientSig, deviceSig) {
    if (!this.isValid(clientPk, devicePk, amount, counter, clientSig, deviceSig)) {
      conn.send({ok : false});
    }

    this.owner.then(owner => {
      this.contract.methods.addTransaction(clientPk, devicePk, amount, counter, clientSig, deviceSig).send({
        from : owner,
        gas : this.gas
      }).then(res => conn.send({ok : res.status == '0x1'}));
    });
  }

  // TODO: not tested
  handleGet(conn, index) {
    this.owner.then(owner => {
      this.contract.methods.getTransaction(index).call().then(x => {
          return { ans : x } // Is this ok? What return type do we have?
      }).then(x =>
        conn.send(x)
      );
    });
  }

  // TODO
  validateTransaction(conn, clientPk, index) {
    let cid = `0x${new Crypto().hash(clientPk).toUpperCase()}`;

    fetch(`http://localhost:3000/api/transaction/get/${cid}/${index}`).then(res => {
      // TODO: decode transaction

      // TODO: check
      // if (!this.isValid(clientPk, devicePk, amount, counter, clientSig, deviceSig)) {
      //   conn.send({ok : false});
      // }

      // TODO: call validateTransaction
    });
  }

  // TODO: add event handler
}
