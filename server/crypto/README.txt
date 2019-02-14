Providing trust between server and client via smart device. Code example in `process.js`.

S       C       D
|-------------->| - server registers device public key onto the blockchain
|       |       |
|<------|       | - client registers identity(public key) onto the blockchain
|       |       |
|       |------>| - client sends his PK to device
|       |       |
|       |<------| - device owner presses the button to end session
|       |       | - (clientPK, amount) are signed by device and returned to client
|       |       |
|       |       |
|<--------------| - client either puts message on blockchain by himself or by
|       |       |   using the backend; however, the backend will only receive
|       |       |   valid messages

The final data stored onto the blockchain is:
(clientPK, devicePk,    amount,  clientSignature,  deviceSignature, counter)
  ^                                  ^                  ^
  |                                  |                  |
client                           provides           provides
 identity                         trust               trust
                                for client          for server

Signatures are done on: (clientPk, amount, counter), counter is increased automatically by contract

- device signs first, client second

Possible attack:
 - client replays transaction => can't since the device is tamperproof and transaction has counter
 - server replays transaction => can't since it does not have device signature for new counter
 - server uses smart device to replay transaction => can't since it does not have the client signature for new counter
 - rollback attacks => the counter only increases on the blockchain
 - server excludes transaction => this can be detected by the log of transactions

Powerful attackers:
 - access to device, user and backend(solution: employees can't make account)
 - attacker that can tamper with device(solution: make device tamper evident)

Counter is known by smart device since only him can generate new valid transactions.
