import Web3Provider from './web3provider';
import Server from '../crypto/server';
import Client from '../crypto/client';

// Blockchain API
export default class TranscationClient extends Web3Provider {
  constructor() {
    super();
  }

  // TODO: not tested
  handleTransaction(conn, clientPk, devicePk, amount, counter, clientSig, deviceSig) {
    // we spend money only on valid transactions
    // verify the Device signature
    if (new Server().verify(clientPk, amount, counter, devicePk, deviceSig)) {
      conn.send({ok : false});
    }

    // verify the client signature
    if (new Client().verify(clientPk, amount, counter, clientSig)) {
      conn.send({ok : false});
    }

    this.owner.then(owner => {
      this.contract.methods.addTransaction(clientPk, devicePk, amount, counter, clientSig, deviceSig).send({
        from : owner,
        gas : this.gas
      }).then(res => conn.send({ok : res.status == '0x1'}));
    });
  }
}
