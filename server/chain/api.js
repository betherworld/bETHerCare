import ChainClient from './client';
import DeviceClient from './device';
import TranscationClient from './transaction';

export default class ChainApi {
  constructor() {
    this.client = new ChainClient();
    this.device = new DeviceClient();
    this.trans  = new TranscationClient();
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

    // register transcations
    server.get('/api/transaction/:cpk/:dpk/:amount/:ctr/:csig/:dsig', (req, res) => {
      this.trans.handleTransaction(
        res,
        res.params.cpk,
        res.params.dpk,
        res.params.amount,
        res.params.ctr,
        res.params.csig,
        res.params.dsig
      );
    });
  }
}
