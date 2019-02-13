import Web3Provider from './web3provider';

const KEY_LENGTH = 42;

// Blockchain API
export default class Chain extends Web3Provider {
  constructor() {
    super();

    this.networkId = '5777';
  }

  // a promise of the owner
  getOwner(contract) {
    return contract.methods.getOwner();
  }

  // we use handlers since we need promisses to work with the chain
  handleAccounts(conn) {
    this.web3.eth.getAccounts().then(value => {
      conn.send(value);
    });
  }

  getContract() {
    let contract = require('../build/contracts/TimeTokens.json');
    let cObject  = new this.web3.eth.Contract(
      contract.abi,
      contract.networks[this.networkId].address
    );
    return cObject;
  }

  handleRegister(conn, publicKey) {
    // valid key -- should be checked via regex
    if (publicKey.length == KEY_LENGTH) {
      let contract = this.getContract();

      // call method registerUser
      contract.methods.registerUser(publicKey).send({
        from : this.getOwner(contract),
      });

      conn.send({
        'ok' : true
      });
    } else {
      conn.send({
        'ok' : false
      });
    }
  }
}
