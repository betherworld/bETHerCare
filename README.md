# bETHer Care
bETHer Care Project for Beth's KISS challenge 2019

### Summary

We provide bidirectional trust between the donors and receivers in the KISS project by using public-key cryptography in combination with the Blockchain and IoT devices. Each receiver has a smart device which automatically registers the times of the voluteering session. To see how the cryptographic schema works and where the root of trust comes from, look at the `server/crypto` folder which has an example of our protocol.

The backend of the KISS project is still kept, but we replace the paper registration with an application. The application has a private-public key pair which can be used to sign a transaction together with the smart device. Each transaction is stored on the blockchain and we provide a gateway through our backend. The system is opt-in, thus allowing users to interact directly with the blockchain in case they don't what to use our gateway. Finally, every time transaction is kept and verified on the blockchain, allowing people to reconstruct the data in case KISS disolves.

### State

What we tried to implement, was that People who want to work with the KISS network could simply track their time on the blockchain with the help of a simple to use device which signs each transaction for the receivers of the work. In the future the app should directly interact with the blockchain instead of the backend API. This was not possible as of today because of the transaction costs of the block chain.

We got the communication between the app and the backend api working. The device unfortunately doesn't work for now, since we couldn't get the bluetooth module to work. The Blockchain part kinda works but could be much more improved we tried that with the v2 of the TimeTokens contract which we unfortunately weren't able to finish. The backend and the blockchain are connected at the moment and we expose a public API for clients.

What is still missing is a method to spend or transfer your TimeTokens.

### Dependecies

Install `npm` and `node.js`:
```
apt install curl
curl -sL https://deb.nodesource.com/setup_10.x | sudo bash -
apt install nodejs
echo "node `node -v`; npm `npm -v`" # check at least 10.x and 6.x
```

Install project dependecies:
```
npm install
```

To add a **new** dependency run:
```
npm install <dependency> --save
```

### Deploy smart contract

Need to install `truffle` and `ganache`.

To deploy open a terminal and run:
```
ganache
```

In another terminal run:
```
truffle compile && truffle deploy --reset
```

### Transpile and run server
```
npm run-script build && npm run-script start
```

### Start database
```
systemctl start mongodb
```
