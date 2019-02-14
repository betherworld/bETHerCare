import ChainClient from './client';
import DeviceClient from './device';

export default class ChainApi {
  constructor() {
    this.client = new ChainClient();
    this.device = new DeviceClient();
  }

  register(server) {
    // register client services
    server.get('/api/client/register/:publicKey', (req, res) => {
      this.client.handleRegister(res, req.params.publicKey);
    });

    server.get('/api/client/balance/:publicKey', (req, res) => {
      this.client.handleBalance(res, req.params.publicKey);
    });

    server.get('/api/client/valid/:publicKey', (req, res) => {
      this.client.handleValid(res, req.params.publicKey);
    });

    server.get('/api/client/maxCounter/:publicKey', (req, res) => {
      this.client.handleMaxCounter(res, req.params.publicKey);
    });

    server.get('/api/client/pk/:publicKey', (req, res) => {
      this.client.handlePk(res, req.params.publicKey);
    });

    // register device services
    server.get('/api/device/register/:publicKey', (req, res) => {
      this.device.handleRegister(res, req.params.publicKey);
    });

    server.get('/api/device/valid/:publicKey', (req, res) => {
      this.device.handleValid(res, req.params.publicKey);
    });

    server.get('/api/device/pk/:publicKey', (req, res) => {
      this.client.handlePk(res, req.params.publicKey);
    });
  }
}
