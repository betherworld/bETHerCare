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

    struct transaction{
        address donor;
        address receiver;
        uint amount;
        //string description; // TODO: Should we keep this or not?
        string signature;
        string tkp; // thingie public key
    }

    constructor() public{
        owner = msg.sender;
    }

    function addTime(address user, uint amount) public{
        if(balanceOf[user].isValid && msg.sender == owner){
            balanceOf[user].balance += amount;
        }
    }

    function getOwner() public view returns(address){
        return owner;
    }

    function getBalanceOf(address user) public view returns(uint){
        return balanceOf[user].balance;
    }

    function registerUser(address user) public{
        if(msg.sender == owner){
            balanceOf[user].isValid = true;
        }
    }

    // we only need receiver since we always generate currency
    function addTransaction(address receiver, uint amount, string signature, string tpk) public {
        transaction memory t = transaction(receiver, amount, signature, tpk);
        emit NewTransaction( transactions.push(t) );
    }
}
