import Web3Provider from './web3provider';

// Blockchain API
export default class DeviceClient extends Web3Provider {
  constructor() {
    super();
  }

  // register a client with a given public key
  // we assume publicKey is a string
  handleRegister(conn, publicKey) {
    this.handleMethod(conn, 'registerDevice', publicKey, [publicKey]);
  }

  handleValid(conn, publicKey) {
    this.handleCall(conn, publicKey, 'isDeviceValid', x => x);
  }

  handlePk(conn, publicKey) {
    this.handleCall(conn, publicKey, 'getDevicePk', x => x);
  }
}
