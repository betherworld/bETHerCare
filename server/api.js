import Chain from './chain';

// Api class that uses all backend services(e.g. Database, Chain, etc.)
export default class Api {
  constructor(server) {
    this.server = server;

    // server components
    this.chain = new Chain();
  }

  register() {
    // requests to usual services should respond directly
    this.server.get('/api/hello', (req, res) => {
      res.send({
        'hello' : 'world'
      });
    });

    // request to the Blockchain should be async, i.e. via handlers
    this.server.get('/api/accounts', (req, res) => {
      this.chain.handleAccounts(res);
    });
  }
}
