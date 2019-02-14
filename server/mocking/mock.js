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
    ];

    this.clients = [
      new Client(),
      new Client(),
      new Client(),
      new Client()
    ];
  }

  generateDevices() {
    this.userDB.insertUser('0xdead', {
      firstName: "Mose",
      lastName: "Müller",
      info: {
        address: "Street placeholder"
      },
    }, this.devices[0].shortKey());
    this.userDB.insertUser('0xbeaf', {
      firstName: "Philip",
      lastName: "Jordan",
      info: {
        address: "Street placeholder"
      },
    }, this.devices[1].shortKey());
  }

  generateClients() {
    this.userDB.insertUser(this.clients[0].shortKey(), {
      firstName: "Mose",
      lastName: "Müller",
      info: {
        address: "Street placeholder"
      },
    }, null).then(() => {
      this.userDB.getUser(this.clients[0].shortKey()).then(console.log);
    });
    this.userDB.insertUser(this.clients[1].shortKey(), {
      firstName: "Philip",
      lastName: "Jordan",
      info: {
        address: "Street placeholder"
      },
    }, null);
    this.userDB.insertUser(this.clients[2].shortKey(), {
      firstName: "Alex",
      lastName: "Scheisse",
      info: {
        address: "Street placeholder"
      },
    }, null);
    this.userDB.insertUser(this.clients[3].shortKey(), {
      firstName: "Bodim",
      lastName: "Bodi",
      info: {
        address: "Street placeholder"
      },
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
