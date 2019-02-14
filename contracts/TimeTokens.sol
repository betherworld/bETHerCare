pragma solidity ^0.5.0;

contract TimeTokens{

    address public owner;
    event NewTransaction(uint index);

    // mapping from clientPk to client
    mapping(uint256 => client_t) public clients;

    // mapping of valid device keys
    mapping(uint256 => device_t) public devices;

    // the array of public transactions
    transaction_t[] transactions;

    struct client_t {
        bool isValid;
        uint balance;

        // the counter is provided by the device and it always has to increase
        // only the backend should be able to increase the counter when a
        // transaction has been published
        uint maxCounter;

        // the client public key which needs to be registered onto the blockchain
        string clientPk;
    }

    struct device_t {
        bool isValid;
        string devicePk;
    }

    // the transaction does not need any donor since we always mint
    struct transaction_t {
        string clientPk;

        // key needed by any external observer to verify integrity
        string devicePk;

        uint amount;
        uint counter;

        // signature over (receiver, amount, counter) by client
        string clientSig;

        // signature over (receiver, amount, counter) by trusted device
        string deviceSig;
    }

    constructor() public {
        owner = msg.sender;
    }

    // balance function administered by backend for faster balance retrieval
    function addTime(uint256 client, uint amount) public {
        if (clients[client].isValid && msg.sender == owner) {
            clients[client].balance += amount;
        }
    }

    // ----------------------------- GETTERS -----------------------------------
    function getOwner() public view returns (address) {
        return owner;
    }

    function getBalance(uint256 client) public view returns(uint) {
        return clients[client].balance;
    }

    function getMaxCounter(uint256 client) public view returns(uint) {
        return clients[client].maxCounter;
    }

    function getPk(uint256 client) public view returns(string memory) {
        return clients[client].clientPk;
    }

    function isDeviceValid(uint256 device) public view returns(bool) {
      return devices[device].isValid;
    }

    function isClientValid(uint256 client) public view returns(bool) {
      return clients[client].isValid;
    }

    // --------------------------- REGISTRATION --------------------------------

    // registration function administered by the backend
    function registerUser(uint256 client, string memory clientPk) public {
        if (msg.sender == owner) {
            // only the backend can register a client, this allows us to keep
            // the balance
            clients[client].isValid  = true;
            clients[client].clientPk = clientPk;
        }
    }

    // the max counter can be updated only by the owner; anyone who follows
    // the chain can detect if backend did not process an instruction
    function updateMaxCounter(uint256 client, uint counter) public {
        if(msg.sender == owner && counter > clients[client].maxCounter) {
            // only the backend can register a client, this allows us to keep
            // the balance
            clients[client].maxCounter = counter;
        }
    }

    // add a new device only by owner; the owner needs to register a new
    // into smart device into the network
    function registerDevice(uint256 device, string memory devicePk) public {
        if (msg.sender == owner) {
            // only the backend can register a user, this allows us to keep
            // the balance
            devices[device].isValid = true;
            devices[device].devicePk = devicePk;
        }
    }

    // --------------------------- TRANSACTIONS --------------------------------

    // we only need receiver since we always generate currency
    function addTransaction(
            string memory clientPk,
            string memory devicePk,
            uint amount,
            uint counter,
            string memory clientSig,
            string memory deviceSig
        ) public {

        transaction_t memory t = transaction_t(
            clientPk,
            devicePk,
            amount,
            counter,
            clientSig,
            deviceSig
        );

        // an event is emmited for the backend to be able to update the balance
        emit NewTransaction( transactions.push(t) );
    }
}
