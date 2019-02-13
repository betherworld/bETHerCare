S       C       D
|-------------->| - server registers device public key onto the blockchain
|       |       |
|<------|       | - client registers onto the blockchain
|       |       |
|       |------>| - client sends signed message to device
|       |       |
|       |<------| - message gets signed, timestamped, nonced and returned to client
|       |       |
|       |       | - client either puts message on blockchain by himself or by
|       |       |   using the backend; however, the backend will only receive
|       |       |   valid messages
|       |       |
