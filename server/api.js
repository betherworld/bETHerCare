import DBApi from './db/api';
import ChainApi from './chain/api';

import Server from './crypto/server';

// Api class that uses all backend services(e.g. Database, Chain, etc.)
export default class Api {
  constructor(server) {
    this.server = server;
  }

  register(mocker) {
    // This is a dummy method used to populate the application. This
    // information should normally by public only to KISS people.
    this.server.get('/api/users', (req, res) => {
      let a = mocker.devices.map(x => x.shortKey());
      let b = mocker.clients.map(x => x.shortKey());
      res.send({
        devices: a,
        clients: b,
      });
    });

    // Mock signatures for a proof of concept: the same operataions
    // should be done onto the device, rather than onto the client
    this.server.get('/api/sign/:cpk/:dpk/:cats', (req, res) => {
      let client = mocker.findClient(req.params.cpk);
      let device = mocker.findDevice(req.params.dpk);
      let cats = req.params.cats;

      // The device stops the counter.
      const clientPk = client.exportKey();
      const amount   = device.exportAmount();
      const devicePk = device.exportKey();
      const counter  = device.exportCounter();

      // The sever then needs to verify the transaction being signed by device.
      let server = new Server();

      const signature = device.sign(clientPk);

      // Server reads transaction whenever someone tries to push to blockchain
      // or when a request arrives
      let ok = server.verify(clientPk, amount, counter, devicePk, signature);

      if (ok) {
        // we can register transaction onto the database
        let sse = Math.floor( Date.now() / 1000 );
        mocker.durationDB.makeDuration(client.shortKey(), sse - amount * 60, sse, cats);
      }

      // This sould be then put onto the blockchain by client through or without us.
      res.send({
        'ok':ok,
        'amount': amount,
        'counter': counter,
        'signature' : signature
      });
    });

    // register components
    new DBApi().register(this.server);
    new ChainApi().register(this.server);
  }
}
