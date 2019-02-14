import ChainClient from './client';

export default class ChainApi {
  constructor() {
    this.client = new ChainClient();
  }

  register(server) {
    // register client services
    server.get('/api/client/register/:publicKey', (req, res) => {
      this.client.handleRegister(res, req.params.publicKey);
    });

    // TODO: this should probably not be public
    server.get('/api/client/addTime/:publicKey/:amount', (req, res) => {
      this.client.handleAddTime(res, req.params.publicKey, req.params.amount);
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
  }
}
