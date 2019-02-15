import UserDB from '../db/user';
import DurationDB from '../db/duration';
import Device from '../crypto/device';
import Client from '../crypto/client';

export default class Mocker {
  constructor() {
    this.userDB = new UserDB();
    this.durationDB = new DurationDB();

    this.devices = [
      new Device(),
      new Device(),
      new Device(),
      new Device(),
    ];

    this.clients = [
      new Client(),
      new Client(),
      new Client(),
      new Client()
    ];
  }

  generateDevices() {
    this.userDB.insertUser(this.devices[0].shortKey(), {
      firstName: "Hermine",
      lastName: "Mailhot",
      address: "2372 Queens Lane"
    }, this.devices[0].shortKey());
    this.userDB.insertUser(this.devices[1].shortKey(), {
      firstName: "Doris",
      lastName: "Viella",
      address: "Baldwin Park"
    }, this.devices[1].shortKey());
    this.userDB.insertUser(this.devices[2].shortKey(), {
      firstName: "Avery",
      lastName: "Rago",
      address: "272 Queens Gardens"
    }, this.devices[0].shortKey());
    this.userDB.insertUser(this.devices[3].shortKey(), {
      firstName: "Yong",
      lastName: "Bui",
      address: "12 Kensington"
    }, this.devices[1].shortKey());
  }

  generateClients() {
    this.userDB.insertUser(this.clients[0].shortKey(), {
      firstName: "Mose",
      lastName: "Müller",
      address: "73 Tailwater Rd. Macomb"
    }, null).then(() => {
      this.userDB.getUser(this.clients[0].shortKey()).then(console.log);
    });
    this.userDB.insertUser(this.clients[1].shortKey(), {
      firstName: "Philip",
      lastName: "Jordan",
      address: "9253 Shadow Brook Road"
    }, null);
    this.userDB.insertUser(this.clients[2].shortKey(), {
      firstName: "Alex",
      lastName: "Scheisse",
      address: "67 S. Wild Horse Drive"
    }, null);
    this.userDB.insertUser(this.clients[3].shortKey(), {
      firstName: "Bodim",
      lastName: "Bodi",
      address: "37 Mayflower"
    }, null);
  }

  generateTransactions() {
    let transactions = require('./transactions.json').transactions;

    for (let t of transactions) {
        t.receiver = this.clients[3].shortKey();
    }
    transactions[0].receiver = this.clients[0].shortKey();
    transactions[1].receiver = this.clients[1].shortKey();
    transactions[2].receiver = this.clients[2].shortKey();

    for (let t of transactions) {
      this.durationDB.makeDuration(t.receiver, t.begin, t.end, t.service);
    }
  }

  mock() {
    // clear database
    this.userDB.remove().then(_ => {
      // generate new entries
      this.generateDevices();
      this.generateClients();
    }).then(() => {
      this.durationDB.remove().then(_ => {
        this.generateTransactions()
      });
    });
  }
}
