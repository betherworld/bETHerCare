import DBApi from './db/api';
import ChainApi from './chain/api';

// Api class that uses all backend services(e.g. Database, Chain, etc.)
export default class Api {
  constructor(server) {
    this.server = server;
  }

  register(mocker) {
    // dummy getter
    this.server.get('/api/hello', (req, res) => {
      res.send({
        'hello' : 'world'
      });
    });

    this.server.get('/api/users', (req, res) => {
      let a = mocker.devices.map(x => x.shortKey());
      let b = mocker.clients.map(x => x.shortKey());
      res.send({
        devices: a,
        clients: b,
      });
    });

    // register components
    new DBApi().register(this.server);
    new ChainApi().register(this.server);
  }
}
