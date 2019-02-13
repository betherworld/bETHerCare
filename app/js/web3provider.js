import Web3 from 'web3';

// The web3provider is a shared frontend and backend service for communicating
// with the blockchain. Inherit from it to use web3.
export default class Web3Provider {
  constructor() {
    const address = "http://localhost:7545";
    this.web3 = new Web3(Web3.givenProvider || address);
  }
}
