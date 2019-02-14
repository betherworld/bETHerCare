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
      address: "Street",
    }, this.devices[0].exportKey());
    this.userDB.insertUser('0xbeaf', {
      firstName: "Philip",
      lastName: "Jordan",
      address: "Street",
    }, this.devices[1].exportKey());
  }

  generateClients() {
    this.userDB.insertUser(this.clients[0].exportKey(), {
      firstName: "Mose",
      lastName: "Müller",
      address: "Street",
    }, null).then(() => {
      this.userDB.getUser(this.clients[0].exportKey()).then(console.log);
    });
    this.userDB.insertUser(this.clients[1].exportKey(), {
      firstName: "Philip",
      lastName: "Jordan",
      address: "Street",
    }, null);
    this.userDB.insertUser(this.clients[2].exportKey(), {
      firstName: "Alex",
      lastName: "Scheisse",
      address: "Street",
    }, null);
    this.userDB.insertUser(this.clients[3].exportKey(), {
      firstName: "Bodim",
      lastName: "Bodi",
      address: "Street",
    }, null);
  }

  generateTransactions() {
    let transactions = require('./transactions.json').transactions;

    for (let t of transactions) {
        t.receiver = this.clients[3].exportKey();
    }
    transactions[0].receiver = this.clients[0].exportKey();
    transactions[1].receiver = this.clients[1].exportKey();
    transactions[2].receiver = this.clients[2].exportKey();

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
