import Client from './client';
import Device from './device';
import Server from './server';

// an example of a signing process as depicted in README
export default class Process {
  constructor() {
    let client = new Client();
    const clientPk = client.exportKey();

    let device = new Device();
    const amount = device.exportAmount();
    const devicePk = device.exportKey();
    const counter = device.exportCounter();

    let server = new Server();

    // Client reads transaction from blockchain and checks it
    client.verify(clientPk, amount, counter, client.sign(clientPk, amount, counter));

    // Server reads transaction whenever someone tries to push to blockchain
    // or when a request arrives
    server.verify(clientPk, amount, counter, devicePk, device.sign(clientPk, amount, counter));
  }
}
