import Client from './client';
import Device from './device';
import Server from './server';

// an example of a signing process as depicted in README
export default class Process {
  constructor() {
    let client = new Client();
    const clientPk = client.exportKey();
    const amount = 5;

    let device = new Device(clientPk, amount);
    const signature = device.sign();
    const devicePk = device.exportDeviceKey();

    new Server().verify(clientPk, amount, signature, devicePk);
  }
}
