import Crypto from '../crypto/crypto';
import Web3 from 'web3';

// The web3provider is a shared frontend and backend service for communicating
// with the blockchain. Inherit from it to use web3.
export default class Web3Provider {
  constructor() {
    const address = "http://localhost:7545";
    this.web3 = new Web3(Web3.givenProvider || address);
    this.networkId = '5777';

    // registering the contract
    let contractABI = require('../../build/contracts/TimeTokens.json');
    this.contract = new this.web3.eth.Contract(
      contractABI.abi,
      contractABI.networks[this.networkId].address
    );

    // a promise of the owner
    this.owner = this.contract.methods.getOwner.call();
    this.gas = 3000000;
  }

  handleMethod(conn, method, publicKey, args) {
    let theId = `0x${new Crypto().hash(publicKey).toUpperCase()}`;

    this.owner.then(owner => {
      this.contract.methods[method](theId, ...args).send({
        from : owner,
        gas : this.gas
      }).then(res => conn.send({ok : res.status == '0x1'}));
    });
  }

  handleCall(conn, publicKey, method, ret) {
    let theId = `0x${new Crypto().hash(publicKey).toUpperCase()}`;

    this.owner.then(owner => {
      this.contract.methods[method](theId).call().then(ret).then(x => {
          return { ans : x }
      }).then(x =>
        conn.send(x)
      );
    });
  }
}
