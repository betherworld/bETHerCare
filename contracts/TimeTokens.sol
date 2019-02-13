pragma solidity ^0.5.0;

contract TimeTokens{

    address public   owner;
    event NewTransaction(uint index);


    mapping(address => userBalance) public balanceOf;
    transaction[] transactions;

    struct userBalance{
        bool isValid;
        uint balance;
    }

    struct transaction{
        address donor;
        address receiver;
        uint amount;
        //string description; // TODO: Should we keep this or not?
        uint256 signature;
        uint256 publicKey;
    }

    constructor() public{
        owner = msg.sender;
    }

    function addTime(address user, uint amount) public{
        if(balanceOf[user].isValid && msg.sender == owner){
            balanceOf[user].balance += amount;
        }
    }


    function getBalanceOf(address user) public view returns(uint){
        return balanceOf[user].balance;
    }

    function registerUser(address user) public{
        if(msg.sender == owner){
            balanceOf[user].isValid = true;
        }
    }

    function addTransaction(address donor, address receiver, uint amount, uint256 signature, uint256 publicKey) public {
        transaction memory t = transaction(donor, receiver, amount, signature, publicKey);
        emit NewTransaction( transactions.push(t) );
    }
}
