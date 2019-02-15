pragma solidity ^0.5.0;


// Still a work in Progress. We tried to use the ethereum account for signing and verifying transactions directly as they arrive.
// Verifying the signing wasn't tested and propably won't work.
// Difference to the first version is, that we use the build in etherum addresses instead of a self generated public key hash, which simplifies
// the whole process and uses the power of the blockchain

contract TimeTokens{
    address public owner;
    event NewTransaction(uint index);

    // mapping from clientPk to client
    mapping(address => client_t) public clients;

    // the array of public transactions
    transaction_t[] transactions;

    struct client_t {
        bool isValid;
        uint balance;

        // the counter is provided by the device and it always has to increase
        // only the backend should be able to increase the counter when a
        // transaction has been published
        uint maxCounter;
    }

    // the transaction does not need any donor since we always mint
    struct transaction_t {
        address receiver;
        address donor;
        uint amount;
        uint counter;

        // signature over (receiver, amount, counter) by client
        bytes receiverSig;

        // signature over (receiver, amount, counter) by trusted device
        bytes donorSig;
    }

    constructor() public {
        owner = msg.sender;
    }

    // ----------------------------- GETTERS -----------------------------------
    function getOwner() public view returns (address) {
        return owner;
    }

    function getBalance(address client) public view returns(uint) {
        return clients[client].balance;
    }

    function getMaxCounter(address client) public view returns(uint) {
        return clients[client].maxCounter;
    }

    function isClientValid(address client) public view returns(bool) {
      return clients[client].isValid;
    }


    // --------------------------- REGISTRATION --------------------------------

    // registration function administered by the backend
    function registerUser(address client) public {
        if (msg.sender == owner) {
            // only the backend can register a client for the moment, this allows us to keep
            // the balance
            clients[client].isValid  = true;
        }
    }

    // --------------------------- TRANSACTIONS --------------------------------


    // Not tested, propably doesn't work
    function addTransaction(
            address receiver,
            address donor,
            uint amount,
            uint counter,
            bytes memory donorSig,
            bytes memory receiverSig
        ) public returns (uint){

        if(clients[receiver].isValid && clients[donor].isValid){
            transaction_t memory t = transaction_t(
                receiver,
                donor,
                amount,
                counter,
                donorSig,
                receiverSig
            );

            string memory message = string(abi.encodePacked("(", donor, ", ", amount, ", ", counter, ")"));
            // an event is emmited for the backend to be able to update the balance
            if(recover( keccak256(abi.encodePacked("\x19Ethereum Signed Message:\n", bytes(message).length, abi.encodePacked(message))), receiverSig) == receiver
            && recover( keccak256(abi.encodePacked("\x19Ethereum Signed Message:\n", bytes(message).length, abi.encodePacked(message))), donorSig)    == donor
            ){
                clients[donor].balance += t.amount;
                // the max counter can be updated only by the owner; anyone who follows
                // the chain can detect if backend did not process an instruction
                if(t.counter > clients[donor].maxCounter) {
                    // only the backend can register a client, this allows us to keep
                    // the balance
                    clients[donor].maxCounter = t.counter;
                }
                transactions.push(t);
                return 0;
            }else{
                return 2;
            }
        }else{
            return 1;
        }
    }


    function recover(bytes32 hash, bytes memory signature) public pure returns (address)
    {
        bytes32 r;
        bytes32 s;
        uint8 v;
        // Check the signature length
        if (signature.length != 65) {
            return (address(0));
        }
        // Divide the signature in r, s and v variables with inline assembly.
        assembly {
            r := mload(add(signature, 0x20))
            s := mload(add(signature, 0x40))
            v := byte(0, mload(add(signature, 0x60)))
        }
        // Version of signature should be 27 or 28, but 0 and 1 are also possible versions
        if (v < 27) {
            v += 27;
        }
        // If the version is correct return the signer address
        if (v != 27 && v != 28) {
            return (address(0));
        } else {
            return ecrecover(hash, v, r, s);
        }
    }


    function getTransaction(uint index) public view returns(
        address,
        address,
        uint,
        uint,
        bytes memory,
        bytes memory) {
      transaction_t memory t = transactions[index];
      return (t.receiver, t.donor, t.amount, t.counter, t.receiverSig, t.donorSig);
    }

}
