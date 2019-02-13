pragma solidity ^0.5.0;

contract TimeTokens{

    address public owner;
    event NewTransaction(uint index);

    mapping(address => userBalance) public balanceOf;
    transaction[] transactions;

    struct userBalance{
        bool isValid;
        uint balance;
    }

    // the transaction does not need any donor since we only generate time
    struct transaction{
        address receiver;
        uint amount;

        // signature signed with the device and client private keys
        string signature;

        // the smart device public key is used to ensure the data was generated
        // by a valid session of voluteering; that is, anybody can add a
        // transaction, but by the key we know that the transaction was
        // generated after a session by a smart device
        string devicePk;

        // the client public key is used to ensure than only the client can
        // write; that is, the backend could add or remove transactions, but
        // by this key, the client has the guarantee that his data is stored
        // on the chain; this allows the client to use the service without the
        // need of ethereum
        string clientPk;
    }

    constructor() public {
        owner = msg.sender;
    }

    function addTime(address user, uint amount) public {
        if (balanceOf[user].isValid && msg.sender == owner) {
            balanceOf[user].balance += amount;
        }
    }

    function getOwner() public view returns(address) {
        return owner;
    }

    function getBalanceOf(address user) public view returns(uint) {
        return balanceOf[user].balance;
    }

    function registerUser(address user) public {
        if(msg.sender == owner) {
            // only the backend can register a user, this allows us to keep
            // the balance
            balanceOf[user].isValid = true;
        }
    }

    // we only need receiver since we always generate currency
    function addTransaction(
            address receiver,
            uint amount,
            string memory signature,
            string memory devicePk,
            string memory clientPk
        ) public {

        transaction memory t = transaction(
            receiver,
            amount,
            signature,
            devicePk,
            clientPk
        );

        // an event is emmited for the backend to be able to update the balance
        emit NewTransaction( transactions.push(t) );
    }
}
