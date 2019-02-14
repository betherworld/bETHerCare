import DBApi from './db/api';
import ChainApi from './chain/api';

// Api class that uses all backend services(e.g. Database, Chain, etc.)
export default class Api {
  constructor(server) {
    this.server = server;
  }

  register() {
    // dummy getter
    this.server.get('/api/hello', (req, res) => {
      res.send({
        'hello' : 'world'
      });
    });

    // register components
    new DBApi().register(this.server);
    new ChainApi().register(this.server);
  }
}
