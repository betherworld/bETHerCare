import Web3Provider from './web3provider';

// Blockchain API
export default class Chain extends Web3Provider {
  constructor() {
    super();
  }

  // we use handlers since we need promisses to work with the chain
  handleAccounts(conn) {
    this.web3.eth.getAccounts().then(value => {
      conn.send(value);
    });
  }
}
