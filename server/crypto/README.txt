Providing trust between server and client via smart device. Code example in `process.js`.

S       C       D
|-------------->| - server registers device public key onto the blockchain
|       |       |
|<------|       | - client registers onto the blockchain
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
