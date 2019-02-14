import Web3Provider from './web3provider';

// Blockchain API
export default class ChainClient extends Web3Provider {
  constructor() {
    super();
  }

  // register a client with a given public key
  // we assume publicKey is a string
  handleRegister(conn, publicKey) {
    this.handleMethod(conn, 'registerUser', publicKey, [publicKey]);
  }

  handleBalance(conn, publicKey) {
    this.handleCall(conn, publicKey, 'getBalance', parseInt);
  }

  handleValid(conn, publicKey) {
    this.handleCall(conn, publicKey, 'isClientValid', x => x);
  }

  handleMaxCounter(conn, publicKey) {
    this.handleCall(conn, publicKey, 'getMaxCounter', parseInt);
  }

  handlePk(conn, publicKey) {
    this.handleCall(conn, publicKey, 'getPk', x => x);
  }

}
