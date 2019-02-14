import UserDB from '../db/user';
import Device from '../crypto/device';
import Client from '../crypto/client';

export default class Mocker {
  constructor() {
    this.userDB = new UserDB();
  }

  generateDevices() {
    this.devices = [
      new Device(),
      new Device(),
    ];

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
    this.clients = [
      new Client(),
      new Client(),
      new Client(),
      new Client()
    ];

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

  mock() {
    // clear database
    this.userDB.remove().then(res => {
      // generate new entries
      this.generateDevices();
      this.generateClients();
    });
  }
}
